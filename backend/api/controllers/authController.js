const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken');
const generateUniquePincode = require('../utils/pinCodeGenerator');
const { isTokenValid} = require('../utils/qrCodeToken');
const {mqttClient} = require('../config/mqtt');

let rfidRegisterOn = false;
let rfidRegisterTimeout;

module.exports = {
  login: async (req, res) => {
    // Destructure 'username' from req.body
    const { username, password } = req.body;

    try {
      // Search by 'username'
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(401).json({ error: 'User not found' });

      const now = new Date();
      if (user.beginDate && user.endDate) {
        if (now < new Date(user.beginDate) || now > new Date(user.endDate)) {
          return res.status(403).json({ error: 'User is not within the valid date range' });
        }
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin, pinCode: user.pinCode },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Send success response with user info
      res.status(200).json({
        message: 'Login successful',
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  rfid_login: async (req, res) => {
    // Destructure 'uid' from req.body
    const { uid } = req.body;

    try {

      if (rfidRegisterOn) {
        // Publish a message to register RFID
        const message = JSON.stringify({ action: 'register', uid });
        mqttClient.publish('rfidRegisterTopic', message, (err) => {
          if (err) {
            console.error('Failed to publish message:', err);
            return res.status(500).json({ error: 'Failed to publish message' });
          } else {
            console.log('Message published:', message);
          }
        });

        return res.status(201).json({ message: 'rfid publish' });
      }

      // Search by 'uid'
      const user = await User.findOne({ where: { uid } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const now = new Date();
      if (user.beginDate && user.endDate) {
        if (now < new Date(user.beginDate) || now > new Date(user.endDate)) {
          return res.status(403).json({ error: 'User is not within the valid date range' });
        }
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, username:user.username, isAdmin: user.isAdmin },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Send success response with user info
      res.status(200).json({
        message: 'Login successful',
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  pin_login: async (req, res) => {
    // Destructure 'pinCode' from req.body
    const { pincode } = req.body;

    try {
      // Search by 'pinCode'
      const user = await User.findOne({ where: { pincode } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const now = new Date();
      if (user.beginDate && user.endDate) {
        if (now < new Date(user.beginDate) || now > new Date(user.endDate)) {
          return res.status(403).json({ error: 'User is not within the valid date range' });
        }
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, username:user.username, isAdmin: user.isAdmin, pinCode: user.pinCode },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Generate a new unique PIN code
      const newPinCode = await generateUniquePincode();

      // Update the user with the new PIN code
      user.pincode = newPinCode;
      await user.save();

      // Send success response with user info
      res.status(200).json({
        message: 'Login successful',
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);

      console.log(new Date(decoded.exp * 1000));

      await BlacklistedToken.create({
        token,
        expiresAt: new Date(decoded.exp * 1000),
      });

      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  qr_check: async (req, res) => {
    const { token } = req.body;

    try {
      const isValid = await isTokenValid(token);

      if (!isValid) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  rfid_register: async (req, res) => {

    const { delay } = req.body;

    const message = JSON.stringify({ status: "warning", content: "Please scan your RFID card" });
    mqttClient.publish('statusTopic', message, (err) => {
      if (err) {
        console.error('Failed to publish message:', err);
        return res.status(500).json({ error: 'Failed to publish message' });
      } else {
        console.log('Message published:', message);
      }
    });

    rfidRegisterOn = true;
    console.log('RFID register mode on');

    // Clear any existing timeout to avoid multiple timeouts running simultaneously
    if (rfidRegisterTimeout) {
      clearTimeout(rfidRegisterTimeout);
    }

    // Set a timeout to turn off the register mode after 30 seconds
    rfidRegisterTimeout = setTimeout(() => {
      rfidRegisterOn = false;
      console.log('RFID register mode off');
      const message = JSON.stringify({ status: "nothing", content: "Waiting..." });
      mqttClient.publish('statusTopic', message, (err) => {
        if (err) {
          console.error('Failed to publish message:', err);
          return res.status(500).json({ error: 'Failed to publish message' });
        } else {
          console.log('Message published:', message);
        }
      });
    }, delay);

    res.status(200).json({ message: 'RFID register process' });
  },
};