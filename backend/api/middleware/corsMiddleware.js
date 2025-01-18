const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5173', 'https://intelli-secure.tom-fourcaudot.com'],
};

module.exports = cors(corsOptions);
