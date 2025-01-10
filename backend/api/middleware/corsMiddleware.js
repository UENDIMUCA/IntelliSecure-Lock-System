const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001', 
 
};

module.exports = cors(corsOptions);
