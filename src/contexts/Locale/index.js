import React, { createContext, useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getStoredLocale, saveLocale } from 'utils/helpers';
import { changeLocale } from 'contexts/Locale/actions';
import localeReducer from 'contexts/Locale/reducers';
import { DEFAULT_LOCALE } from '../../i18n';

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(localeReducer, {
    locale: DEFAULT_LOCALE,
  });
  const { locale: currentLocale } = state;

  useEffect(() => {
    const storedLocale = getStoredLocale();
    if (storedLocale) dispatch(changeLocale(storedLocale));
  }, []);

  useEffect(() => {
    saveLocale(currentLocale);
  }, [currentLocale]);

  return (
    <LocaleContext.Provider value={[state, dispatch]}>
      {children}
    </LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export const useLocaleValue = () => {
  const [{ locale }, dispatch] = useContext(LocaleContext);
  return [locale, dispatch];
};
