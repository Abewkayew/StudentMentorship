import { LOCAL_STORAGE_KEY, TOKEN_KEY } from 'utils/constants';

const write = (key, value) => localStorage.setItem(key, value);
const read = key => localStorage.getItem(key);
const remove = key => localStorage.removeItem(key);

// locales
export const getStoredLocale = () => read(LOCAL_STORAGE_KEY);
export const saveLocale = locale => write(LOCAL_STORAGE_KEY, locale);

//token
export const getToken = () => read(TOKEN_KEY);
export const saveToken = token => write(TOKEN_KEY, token);
export const removeToken = () => remove(TOKEN_KEY);

//blog
export const getSavedBlog = key => read(key);

export const isEmpty = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object;
