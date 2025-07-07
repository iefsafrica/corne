require('dotenv').config();

const { app } = require('./server');
const {getConnection} = require('../config/db/connection');

const PORT = require('../config/env/variables')

const startServer = async () => {
  try {
    const message = await getConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
