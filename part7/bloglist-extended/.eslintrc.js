module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react', 'jest', 'cypress',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'linebreak-style': 0,
    'react/prop-types': 0,
  },
};
