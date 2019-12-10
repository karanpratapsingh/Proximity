import { showMessage } from 'react-native-flash-message';
import { ThemeStatic } from '../theme';

export const welcomeNotification = () => showMessage({
  message: 'Welcome to Proximity',
  icon: 'success',
  type: 'success',
  duration: 2000
});

export const postUploadedNotification = () => showMessage({
  message: 'Upload complete, your post is live',
  icon: 'success',
  type: 'success',
  duration: 2000
});

export const uploadErrorNotification = (asset: string) => showMessage({
  message: `${asset} upload failed, please try again later`,
  icon: 'danger',
  type: 'danger',
  duration: 2000
});

export const inputLimitErrorNotification = (type: string, condition: string, limit: number) => showMessage({
  message: `${type} should be ${condition} than ${limit} characters`,
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const somethingWentWrongErrorNotification = () => showMessage({
  message: 'Oops, please try again later',
  icon: 'danger',
  type: 'danger',
  duration: 4000
});


export const showErrorNotification = (message: string) => showMessage({
  message,
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const noAssetInfoNotification = () => showMessage({
  message: 'Please pick an image before uploading',
  icon: 'info',
  type: 'info',
  backgroundColor: ThemeStatic.accent,
  duration: 2000
});

export const noPermissionNotification = () => showMessage({
  message: 'Please allow photo gallery permissions',
  icon: 'danger',
  type: 'danger',
  duration: 4000
});

export const deleteChatNotification = (onLongPress) => showMessage({
  message: 'Delete? long press this notification to confirm',
  icon: 'danger',
  type: 'danger',
  duration: 4000,
  onLongPress
});

export const tryAgainLaterNotification = () => showMessage({
  message: 'Please try again later',
  icon: 'danger',
  type: 'danger',
  duration: 4000
});