module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
  },
};
