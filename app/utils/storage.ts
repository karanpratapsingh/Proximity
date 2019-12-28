import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 7 * 1000 * 3600 * 24, // 7 days, eg: 1 day (1000 * 3600 * 24 milliseconds)
  enableCache: true
});

export const StorageErrorTypes = {
  Expired: 'ExpiredError',
  NotFound: 'NotFoundError'
};

export const saveToken = (token: string) => {
  return storage.save({
    key: 'proximity:token',
    data: token
  });
};

export const loadToken = () => {
  return storage.load({
    key: 'proximity:token'
  });
};

export const removeToken = () => {
  return storage.remove({
    key: 'proximity:token'
  });
};

export const saveThemeType = (themeType: string) => {
  return storage.save({
    key: 'proximity:theme',
    data: themeType,
    expires: null // never expires until changed
  });
};

export const loadThemeType = () => {
  return storage.load({
    key: 'proximity:theme'
  });
};

export default storage;
