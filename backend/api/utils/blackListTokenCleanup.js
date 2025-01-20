const cron = require('node-cron');
const { Op } = require('sequelize');
const BlacklistedToken = require('../models/blacklistedToken');

// Planifier une tâche pour supprimer les utilisateurs temporaires expirés
cron.schedule('0 0 * * *', async () => {
    console.log('Running temporary user cleanup task');
    try {
        const now = new Date();
        await BlacklistedToken.destroy({
        where: {
            expiresAt: {
            [Op.lt]: now,
            },
        },
        });
        console.log('Expired token cleaned up');
    } catch (error) {
        console.error('Error cleaning up expired token:', error);
    }
});