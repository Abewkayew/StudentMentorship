import * as React from 'react';

import { DEFAULT_LOCALE } from '../../i18n';

const { Provider, Consumer } = React.createContext(
  (() => {
    return {
      getLocale: () => DEFAULT_LOCALE,
      updateLocale: locale => {},
    };
  })(),
);

export { Provider, Consumer, DEFAULT_LOCALE };
