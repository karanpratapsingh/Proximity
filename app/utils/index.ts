export const createAsyncDelay = duration => {

  return new Promise((resolve, _) => setTimeout(() => { resolve(); }, duration));
};

export const parseConnectionsCount = connectionCount => {
  return connectionCount.toString();
};