import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { useLocaleValue } from 'contexts/Locale';

const LanguageProvider = props => {
  const [locale] = useLocaleValue();
  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={props.messages[locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = {
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default LanguageProvider;
