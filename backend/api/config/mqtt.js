const mqtt = require('mqtt');

const options = {
    host: 'mosquitto.intelli-secure.tom-fourcaudot.com',
    port: 1883, 
    username: 'admin', 
    password: 'E6PKMWup3CSmaJT1Wtt4mx4BqJ',
  };
  
const mqttClient = mqtt.connect(options);

module.exports = {
    mqttClient,
};