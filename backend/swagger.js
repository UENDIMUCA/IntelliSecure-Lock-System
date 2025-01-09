// filepath: backend/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IntelliSecure API',
      version: '1.0.0',
      description: 'API for the IntelliSecure Lock System, enabling secure smart lock management. Supports user registration, authentication via JWT, and control of smart lock functionalities, including access management and status monitoring.',
    },
  },
  apis: ['./api/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};