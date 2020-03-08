import firebase from 'react-native-firebase';
import { generateUUID } from './shared';
import { Asset, StoragePaths, Errors } from '@app/constants';
import { Platform } from 'react-native';

export const storage = firebase.storage();
export const messaging = firebase.messaging();
export const notifications = firebase.notifications();
export const crashlytics = firebase.crashlytics();

export const initializeFCM = async () => {
  try {
    if (Platform.OS === 'android') {
      const channel = new firebase
        .notifications
        .Android
        .Channel('proximity-channel', 'Notification Channel', firebase.notifications.Android.Importance.Max)
        .setDescription('Proximity Notification Channel')
        .setSound('default');

      notifications.android.createChannel(channel);
    }
    const hasPermission = await messaging.hasPermission();
    if (!hasPermission) {
      await messaging.requestPermission();
      return null;
    } else if (hasPermission) {
      return await messaging.getToken();
    }
  } catch ({ message }) {
    crashlytics.recordCustomError(Errors.INITIALIZE_FCM, message);
  }
};

export const uploadToStorage = (asset: string, uri: string, userId: string) => {
  const [type] = getMediaType(uri);
  let storageRef;

  if (asset === Asset.avatar) {
    storageRef = `${StoragePaths.avatars}/${userId}.${type}`;
  } else if (asset === Asset.post) {
    storageRef = `${StoragePaths.posts}/${userId}/${generateUUID()}.${type}`;
  }

  return storage
    .ref(storageRef)
    .putFile(uri);
};

export const getMediaType = (uri: string) => uri.split('.').slice(-1);

export const deleteFromStorage = (uri: string) => storage.refFromURL(uri).delete();