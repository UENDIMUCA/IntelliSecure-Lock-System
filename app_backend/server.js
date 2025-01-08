const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000; // Port where backend will run

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',        // PostgreSQL username
  host: 'localhost',       // Database host
  database: 'smartdoor',   // Database name
  password: 'admin',       // PostgreSQL password
  port: 5432,              // PostgreSQL port
});

// API Routes

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database for matching email and password
    const result = await pool.query(
      'SELECT email, password, is_admin FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    console.log("Database query result:", result.rows); // Debugging log

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({
        success: true,
        isAdmin: user.is_admin, // Include is_admin in the response
        email: user.email,      // Include email in the response
        message: 'You are on home!',
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
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
