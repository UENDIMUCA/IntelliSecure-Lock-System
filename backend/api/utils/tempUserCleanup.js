const cron = require('node-cron');
const { Op } = require('sequelize');
const User = require('../models/user');

// Planifier une tâche pour supprimer les utilisateurs temporaires expirés
cron.schedule('0 0 * * *', async () => {
    console.log('Running temporary user cleanup task');
    try {
        const now = new Date();
        await User.destroy({
        where: {
            endDate: {
            [Op.lt]: now,
            },
        },
        });
        console.log('Expired temporary users cleaned up');
    } catch (error) {
        console.error('Error cleaning up expired temporary users:', error);
    }
});