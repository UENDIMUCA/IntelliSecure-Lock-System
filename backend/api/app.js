const express = require('express');
const app = express();
const { swaggerUi, specs } = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const corsMiddleware = require('./middleware/corsMiddleware');

require('./utils/tempUserCleanup');

app.use(corsMiddleware);

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;