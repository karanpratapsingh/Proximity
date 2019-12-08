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
  try {
    await messaging.deleteToken();
    await removeToken();
  } catch ({ message }) {
    // Error: signout
    alert(JSON.stringify(message));
  }
};