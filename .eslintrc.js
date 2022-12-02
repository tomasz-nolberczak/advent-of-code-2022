module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint-config-airbnb-base',     'plugin:prettier/recommended',]
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
