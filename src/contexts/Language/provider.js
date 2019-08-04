import React from 'react';
import PropTypes from 'prop-types';

import { getStoredLocale, saveLocale } from 'utils/helpers';
import { Provider, DEFAULT_LOCALE } from './context';

class LocaleProvider extends React.Component {
  state = {
    locale: DEFAULT_LOCALE,
  };

  handleOnLocaleChange = locale => {
    this.setState({ locale });
  };

  componentWillMount() {
    const storedLocale = getStoredLocale();
    if (storedLocale) {
      this.handleOnLocaleChange(storedLocale);
    }
  }

  getLocale = () => {
    const { locale } = this.state;
    return locale;
  };

  updateLocale = locale => {
    this.setState(
      {
        locale,
      },
      () => {
        const { locale } = this.state;
        saveLocale(locale);
      },
    );
  };

  render() {
    const getLocale = this.getLocale;
    const updateLocale = this.updateLocale;

    return (
      <Provider value={{ getLocale, updateLocale }}>
        {this.props.children}
      </Provider>
    );
  }
}

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
