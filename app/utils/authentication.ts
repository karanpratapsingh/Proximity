import { messaging } from './firebase';
import { StorageErrorTypes, removeToken } from './storage';
import { crashlytics } from '../utils/firebase';
import { Errors } from '../constants';

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
  try {
    await messaging.deleteToken();
    await removeToken();
  } catch ({ message }) {
    crashlytics.recordCustomError(Errors.SIGN_OUT, message);
  }
};