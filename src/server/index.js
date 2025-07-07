const { app } = require('./server');
const config = require('../config/db/connection'); 
const getConnection = require('../config/db/connection').getConnection;

const PORT = config.PORT || 3000;

const startServer = async () => {
  try {
    await getConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
