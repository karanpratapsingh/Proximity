import firebase from 'react-native-firebase';
import { generateUUID } from './shared';
import { Asset, StoragePaths } from '../constants';

export const storage = firebase.storage();
export const messaging = firebase.messaging();
export const notifications = firebase.notifications();
export const crashlytics = firebase.crashlytics();

export const uploadToStorage = (asset: string, uri: string, userId: string) => {
  const [type] = getMediaType(uri);
  let storageRef;

  if (asset === Asset.avatar) {
    storageRef = `${StoragePaths.avatars}/${userId}.${type}`
  } else if (asset === Asset.post) {
    storageRef = `${StoragePaths.posts}/${userId}/${generateUUID()}.${type}`
  }

  return storage
    .ref(storageRef)
    .putFile(uri);
};

export const getMediaType = (uri: string) => uri.split('.').slice(-1);