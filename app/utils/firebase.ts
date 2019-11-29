import firebase from 'react-native-firebase';
import { generateUUID } from './shared';

export const storage = firebase.storage();
export const messaging = firebase.messaging();

export const uploadToStorage = (path: string, uri: string) => {
  const [type] = uri.split('.').slice(-1);
  return storage
    .ref(`${path}/${generateUUID()}.${type}`)
    .putFile(uri);
};