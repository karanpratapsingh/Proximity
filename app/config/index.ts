import { Platform } from 'react-native';

const {
  author: {
    name,
    email,
    url
  },
  repository: {
    url: repository
  },
  version
} = require('../../package.json');

const codepush = {
  staging: Platform.select({
    ios: '<private>',
    android: '<private>'
  }),
  production: Platform.select({
    ios: '<private>',
    android: '<private>'
  })
};

const Config = {
  author: { name, email, url },
  repository,
  version,
  codepush,
  url: {
    https: 'https://proximity-development.herokuapp.com/',
    wss: 'wss://proximity-development.herokuapp.com/'
  }
};

export default Config;
