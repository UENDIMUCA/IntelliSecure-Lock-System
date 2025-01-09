const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user.model'); // User model

const app = express();
const port = 5000; // Port where backend will run

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database for matching email
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(), // Case-insensitive email match
      },
      attributes: ['email', 'password', 'is_admin'], // Select only required fields
    });

    if (user) {
      // Direct plain-text password comparison
      if (password === user.password) {
        // Password is correct, respond with success
        res.status(200).json({
          success: true,
          isAdmin: user.is_admin, // Include is_admin in the response
          email: user.email,      // Include email in the response
          message: 'You are on home!',
        });
      } else {
        // Password is incorrect
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }
    } else {
      // No user found with the given email
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    // Handle errors
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});