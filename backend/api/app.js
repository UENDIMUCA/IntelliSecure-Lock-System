const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();



app.use(express.json());  // Built-in JSON body parser


// Mount authentication routes
app.use('/api/auth', authRoutes);  // This will handle /api/auth/login
app.use('/api/users', userRoutes); 

module.exports = app;