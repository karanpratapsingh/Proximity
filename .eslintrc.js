module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    }
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2]
  },
  'globals': {
    'fetch': false
  }
};
