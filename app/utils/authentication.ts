import { messaging, crashlytics, auth } from './firebase';
import { StorageErrorTypes, removeToken } from './storage';
import { Errors } from '@app/constants';

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
    await auth.signOut();
  } catch ({ message }) {
    crashlytics.recordCustomError(Errors.SIGN_OUT, message);
  }
};