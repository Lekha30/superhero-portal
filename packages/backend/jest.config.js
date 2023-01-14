const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['./tests/setup.ts'],
  modulePathIgnorePatterns: ['/dist/'],
};
