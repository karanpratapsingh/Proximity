import ImagePicker from "react-native-image-crop-picker";
import { ThemeStatic } from "../theme";

export const createAsyncDelay = (duration: number) => {

  return new Promise((resolve, _) => setTimeout(() => { resolve(); }, duration));
};

export const parseConnectionsCount = connectionCount => {
  return connectionCount.toString();
};

export const parseTimeElapsed = utcTime => {

  let timeElapsedFormatted = '...';
  const timeNow = new Date().getTime();
  const actionTime = new Date(utcTime).getTime();

  let difference = timeNow - actionTime;

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;

  const elapsedDays = parseInt(difference / daysInMs as any, 10);
  difference = difference % daysInMs;

  const elapsedHours = parseInt(difference / hoursInMs as any, 10);
  difference = difference % hoursInMs;

  const elapsedMinutes = parseInt(difference / minutesInMs as any, 10);
  difference = difference % minutesInMs;

  if (elapsedDays >= 1) return `${elapsedDays} days`;
  if (elapsedHours >= 1) return `${elapsedHours} hrs`;
  if (elapsedMinutes >= 1) return `${elapsedMinutes} mins`;
  if (elapsedMinutes < 1) return 'just now';

  return timeElapsedFormatted;
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const transformMessages = messages =>
  messages.map(message => {
    const { id, body, createdAt, author: {
      id: authorId,
      name,
      avatar
    } } = message;

    return {
      _id: id,
      text: body,
      createdAt: new Date(createdAt),
      user: {
        _id: authorId,
        name,
        avatar
      }
    };
  });

export const filterChatParticipants = (userId, participants) =>
  participants.filter(participant => userId !== participant.id);

export const getImageFromLibrary = async (height: number, width: number, circular: boolean = false) => {
  const options = {
    height,
    width,
    cropperCircleOverlay: circular,
    cropping: true,
    cropperActiveWidgetColor: ThemeStatic.accent,
    cropperStatusBarColor: ThemeStatic.accent,
    cropperToolbarColor: ThemeStatic.accent,
    compressImageQuality: 0.5,
    mediaType: 'photo'
  };

  return ImagePicker.openPicker(options);
};