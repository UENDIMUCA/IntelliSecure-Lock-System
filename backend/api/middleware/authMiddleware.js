const jwt = require('jsonwebtoken');
const config = require('../config/config');
const BlacklistedToken = require('../models/blacklistedToken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token format invalid' });

  const blacklisted = await BlacklistedToken.findOne({ where: { token } });
  if (blacklisted) {
    return res.status(401).json({ error: 'Token is blacklisted' });
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 'Token expired' });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
