// Centralized configuration for the application
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: '1d'
};
