const mqtt = require('mqtt');
const crypto = require('crypto');

const options = {
    host: 'mosquitto.intelli-secure.tom-fourcaudot.com',
    port: 1883, 
    username: 'admin', 
    password: 'E6PKMWup3CSmaJT1Wtt4mx4BqJ',
  };
  
const client = mqtt.connect(options);

let currentToken = '';

function generateAndPublishToken() {
    currentToken = crypto.randomBytes(16).toString('hex'); // Generate a basic token
  
    client.publish('qrCodeTokenTopic', currentToken, (err) => {
      if (err) {
        console.error('Failed to publish token:', err);
      } else {
        console.log('Token published:', currentToken);
      }
    });
  }

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
  
    // Generate and publish the first token immediately
    generateAndPublishToken();
  
    // Set interval to generate and publish a token every 20 seconds
    setInterval(generateAndPublishToken, 20000); // 20000 milliseconds = 20 seconds
  });

client.on('error', (err) => {
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
  isTokenValid,
};