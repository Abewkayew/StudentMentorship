import { CHANGE_LOCALE } from 'contexts/Locale/constants';

export const changeLocale = locale => {
  return {
    type: CHANGE_LOCALE,
    locale,
  };
};
