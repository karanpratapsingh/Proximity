export const createAsyncDelay = duration => {

    return new Promise((resolve, _) => setTimeout(() => { resolve(); }, duration));
};