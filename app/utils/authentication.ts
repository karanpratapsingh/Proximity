import { messaging } from './firebase';
import { StorageErrorTypes, removeToken } from './storage';

export const handleLoginError = async (errorType: string) => {
  switch (errorType) {
    case StorageErrorTypes.Expired:
      await signOut();
      break;

    case StorageErrorTypes.NotFound:
      break;

    default:
      break;
  }
};

export const signOut = async () => {
  await messaging.deleteToken();
  await removeToken();
};