const mqtt = require('mqtt');

const options = {
    host: process.env.MQTT_HOST,
    port: 1883, 
    username: process.env.MQTT_USERNAME, 
    password: process.env.MQTT_PASSWORD,
  };
  
const mqttClient = mqtt.connect(options);

module.exports = {
    mqttClient,
};