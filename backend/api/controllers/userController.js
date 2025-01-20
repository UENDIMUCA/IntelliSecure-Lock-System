const User = require('../models/user');
const generateUniquePincode = require('../utils/pinCodeGenerator');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { isTemporary, beginDate, endDate } = req.body;

      const _pincode = await generateUniquePincode(); // Utilisez await pour attendre la résolution de la promesse

      // If this is a temporary user, validate the dates
      if (isTemporary) {
        if (!beginDate || !endDate) {
          return res.status(400).json({ error: 'Temporary users require beginDate and endDate' });
        }
      }

      // Create the user, including temporary fields if provided
      const user = await User.create({
        ...req.body,
        pincode: _pincode,
        beginDate: isTemporary ? beginDate : null,
        endDate: isTemporary ? endDate : null,
      });

      res.status(201).json(user.toJSON());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    const users = await User.findAll();
    res.json(users.map((user) => user.toJSON()));
  },

  getUserById: async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.toJSON());
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const { isTemporary, beginDate, endDate } = req.body;

      // If updating to a temporary user, ensure dates are valid
      if (isTemporary) {
        if (!beginDate || !endDate) {
          return res.status(400).json({ error: 'Temporary users require beginDate and endDate' });
        }
      }

      // Update the user, including temporary fields if provided
      await user.update({
        ...req.body,
        beginDate: isTemporary ? beginDate : user.beginDate,
        endDate: isTemporary ? endDate : user.endDate,
      });

      res.json(user.toJSON());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.status(204).send();
  },
};
