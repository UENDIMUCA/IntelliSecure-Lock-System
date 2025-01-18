const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/user');
const generateUniquePincode = require('../utils/pinCodeGenerator');

module.exports = {
  login: async (req, res) => {
    // Destructure 'username' from req.body
    const { username, password } = req.body;

    try {
      // Search by 'username'
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(401).json({ error: 'User not found' });

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
      // Search by 'uid'
      const user = await User.findOne({ where: { uid } });
      if (!user) return res.status(404).json({ error: 'User not found' });

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
  }
};