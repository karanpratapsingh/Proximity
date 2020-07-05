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

const webClientId: string = '649469906394-0d9hghf2jv5n9n0t0o763e5bheer720f.apps.googleusercontent.com';

const Config = {
  author: { name, email, url },
  repository,
  version,
  codepush,
  url: {
    https: 'https://proximity-development.herokuapp.com/',
    wss: 'wss://proximity-development.herokuapp.com/',
  },
  webClientId
};

export default Config;
