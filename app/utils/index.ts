export const createAsyncDelay = duration => {

  return new Promise((resolve, _) => setTimeout(() => { resolve(); }, duration));
};

export const parseConnectionsCount = connectionCount => {
  return connectionCount.toString();
};

export const parseTimeElapsed = utcTime => {
  return '22hrs';
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};