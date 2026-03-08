const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { initializeDatabase } = require('./utils/initDatabase');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      stack: error.stack,
    });
    process.exit(1);
  }
})();
