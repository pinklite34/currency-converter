module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:array-func/recommended',
    'prettier',
    'airbnb-base',
    'eslint-config-prettier'
  ],
  plugins: [
    'node',
    'array-func',
    'jest',
    'optimize-regex',
    'prettier',
    'promise',
    'security',
    'unicorn',
    'jsdoc',
    'sonarjs'
  ],
  parserOptions: {
    ecmaVersion: 2015,
    impliedStrict: true
  },
  env: {
    browser: false,
    node: true,
    jest: true,
    es6: true,
    worker: false,
    serviceworker: false
  },
  rules: {
    'max-len': ['error', { code: 90 }],
    'object-curly-newline': ['error', { consistent: true }],
    'array-func/prefer-array-from': 'off',
    'function-paren-newline': 'off',
    'arrow-parens': ['error', 'always'],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    semi: 'error',

    'unicorn/no-process-exit': 'off'
  }
};
