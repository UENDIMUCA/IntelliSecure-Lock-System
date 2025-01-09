const User = require('../models/user');

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  },
  getUserById: async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      await user.update(req.body);
      res.json(user);
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
