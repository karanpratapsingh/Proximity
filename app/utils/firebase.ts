import firebase, { AuthCredential } from 'react-native-firebase';
import { generateUUID } from './shared';
import { Asset, StoragePaths, Errors, AuthDefaults } from '@app/constants';
import { Platform } from 'react-native';
import { SocialSignInType, SocialSignInResult } from '@app/types/auth';

export const storage = firebase.storage();
export const messaging = firebase.messaging();
export const notifications = firebase.notifications();
export const crashlytics = firebase.crashlytics();
export const auth = firebase.auth();

const getGoogleCredentials = (
  idToken: string | null,
  accessToken: string | undefined,
): AuthCredential =>
  firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

const getAppleCredentials = (
  identityToken: string | null,
  nonce: string,
): AuthCredential =>
  firebase.auth.AppleAuthProvider.credential(identityToken, nonce);

export const processSocialSignIn = async (
  authResult: any,
  type: SocialSignInType,
): Promise<SocialSignInResult> => {
  let credentials: AuthCredential;

  if (type === SocialSignInType.GOOGLE) {
    const { idToken, accessToken } = authResult;
    credentials = getGoogleCredentials(idToken, accessToken);
  } else {
    const { identityToken, nonce } = authResult;
    credentials = getAppleCredentials(identityToken, nonce);
  }

  const {
    user: { providerData, providerId },
  } = await auth.signInWithCredential(credentials);
  const [
    { uid: token, displayName, photoURL, email },
  ] = providerData;

  const name = displayName || AuthDefaults.name;
  const avatar = photoURL || AuthDefaults.avatar;
  const safeEmail = email || `${token}@${providerId}`;

  const socialSignInResult = {
    token,
    name,
    avatar,
    email: safeEmail,
  };
  
  return socialSignInResult;
};

export const initializeFCM = async () => {
  try {
    if (Platform.OS === 'android') {
      const channel = new firebase.notifications.Android.Channel(
        'proximity-channel',
        'Notification Channel',
        firebase.notifications.Android.Importance.Max,
      )
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
  let storageRef: string | undefined;

  if (asset === Asset.avatar) {
    storageRef = `${StoragePaths.avatars}/${userId}.${type}`;
  } else if (asset === Asset.post) {
    storageRef = `${StoragePaths.posts}/${userId}/${generateUUID()}.${type}`;
  }

  return storage.ref(storageRef).putFile(uri);
};

export const getMediaType = (uri: string) => uri.split('.').slice(-1);

export const deleteFromStorage = (uri: string) =>
  storage.refFromURL(uri).delete();
