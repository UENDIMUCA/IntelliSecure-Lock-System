const express = require('express'); 
const { sequelize, UserData, fetchUser} = require('./db'); // Import from db.js
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Express server
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });

app.get('/api/users', async (req, res) => {
    try{
        const users = await fetchUser(); // Call fetchData from db.js
    res.json(users);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

  // Endpoint to fetch initial data
app.post('/login/uid', async (req, res) => {
    try {
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/login/code', async (req, res) => {
    try{
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});