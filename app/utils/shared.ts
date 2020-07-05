import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { ThemeStatic } from '@app/theme';
import { Timeouts } from '@app/constants';
import { noPermissionNotification } from './notifications';
import { ExplorePost } from '@app/types/screens';

export const createAsyncDelay = (duration: number) => {
  return new Promise((resolve, _) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );
};

export const parseConnectionsCount = (connectionCount: number) => {
  // parse larger numbers here
  return connectionCount.toString();
};

export const parseTimeElapsed = (utcTime: string) => {
  const timeNow = new Date().getTime();
  const actionTime = new Date(utcTime).getTime();

  let difference = timeNow - actionTime;

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const weekInMs = daysInMs * 7;

  const elapsedWeeks = parseInt((difference / weekInMs) as any, 10);
  difference = difference % weekInMs;

  const elapsedDays = parseInt((difference / daysInMs) as any, 10);
  difference = difference % daysInMs;

  const elapsedHours = parseInt((difference / hoursInMs) as any, 10);
  difference = difference % hoursInMs;

  const elapsedMinutes = parseInt((difference / minutesInMs) as any, 10);
  difference = difference % minutesInMs;

  let parsedTime = '...';

  if (elapsedWeeks >= 1) {
    if (elapsedWeeks === 1) {
      parsedTime = `${elapsedWeeks} week`;
    } else {
      parsedTime = `${elapsedWeeks} weeks`;
    }
  } else if (elapsedDays >= 1) {
    if (elapsedDays === 1) {
      parsedTime = `${elapsedDays} day`;
    } else {
      parsedTime = `${elapsedDays} days`;
    }
  } else if (elapsedHours >= 1) {
    if (elapsedHours === 1) {
      parsedTime = `${elapsedHours} hr`;
    } else {
      parsedTime = `${elapsedHours} hrs`;
    }
  } else if (elapsedMinutes >= 1) {
    if (elapsedMinutes === 1) {
      parsedTime = `${elapsedMinutes} min`;
    } else {
      parsedTime = `${elapsedMinutes} mins`;
    }
  } else if (elapsedMinutes < 1) parsedTime = 'just now';

  const readableTime =
    parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;

  return {
    parsedTime,
    readableTime,
  };
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const transformMessages = messages =>
  messages.map(message => {
    const {
      id,
      body,
      createdAt,
      author: { id: authorId, name, avatar },
    } = message;

    return {
      _id: id,
      text: body,
      createdAt: new Date(createdAt),
      user: {
        _id: authorId,
        name,
        avatar,
      },
    };
  });

export const filterChatParticipants = (userId: string, participants) =>
  participants.filter(participant => userId !== participant.id);

export const getImageFromLibrary = async (
  height: number,
  width: number,
  circular: boolean = false,
) => {
  const options: Options = {
    height,
    width,
    cropperCircleOverlay: circular,
    cropping: true,
    cropperActiveWidgetColor: ThemeStatic.accent,
    cropperStatusBarColor: ThemeStatic.accent,
    cropperToolbarColor: ThemeStatic.accent,
    compressImageQuality: 0.8,
    mediaType: 'photo',
    writeTempFile: true
  };

  try {
    const assetData = await ImagePicker.openPicker(options);
    return assetData;
  } catch ({ code }) {
    if (!code.includes('CANCELLED')) {
      noPermissionNotification();
    }
  }
};

export const isUserOnline = (lastSeen: number) => {
  const now = Date.now() / 1000;
  return now - lastSeen < Timeouts.online;
};

export const parseLikes = (likeCount: number) => {
  return likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`;
};

export const searchQueryFilter = (array, userId: string, query: string) =>
  [...array].filter(({ participants }) => {
    const [participant] = filterChatParticipants(userId, participants);
    if (query === '') return true;
    return participant.handle.toLowerCase().includes(query.toLocaleLowerCase());
  });

export const sortMessageAscendingTime = array =>
  [...array].sort((a, b) => {
    const [lastMessageA] = a.messages;
    const [lastMessageB] = b.messages;

    // @ts-ignore
    return new Date(lastMessageB.createdAt) - new Date(lastMessageA.createdAt);
  });

export const computeUnreadMessages = (chats, userId: string) =>
  chats.filter(({ messages }) => {
    const [lastMessage] = messages;
    const { author, seen } = lastMessage;

    return !seen && author.id !== userId;
  }).length;

export const sortPostsAscendingTime = array =>
  // @ts-ignore
  [...array].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const parseGridImages = (images: ExplorePost[]): ExplorePost[][] => {
  const parsedImages: ExplorePost[][] = [];

  for (let i = 0; i < images.length; i++) {
    let imageGroup: ExplorePost[];

    if (i % 3 === 0) {
      imageGroup = images.slice(i, i + 3);
      parsedImages.push(imageGroup);
    }
  }

  return parsedImages;
};
