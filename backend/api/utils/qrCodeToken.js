const {mqttClient} = require('../config/mqtt');
const crypto = require('crypto');

let currentToken = '';

function generateAndPublishToken() {
    currentToken = crypto.randomBytes(16).toString('hex'); // Generate a basic token

    mqttClient.publish('qrCodeTokenTopic', currentToken, (err) => {
        if (err) {
            console.error('Failed to publish token:', err);
        } else {
            console.log('Token published:', currentToken);
        }
    });
}

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Generate and publish the first token immediately
    generateAndPublishToken();

    // Set interval to generate and publish a token every 20 seconds
    setInterval(generateAndPublishToken, 30000); // 30000 milliseconds = 30 seconds
});

mqttClient.on('error', (err) => {
    console.error('MQTT connection error:', err);
});

/**
 * Checks if the given token is valid
 * @param {string} token - The token to check
 * @returns {boolean} - Returns true if the token is valid, otherwise false
 */
function isTokenValid(token) {
    return token === currentToken;
}

module.exports = {
    isTokenValid
};