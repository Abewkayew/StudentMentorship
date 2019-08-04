import React from 'react';

import Toggle from 'components/Toggle';
import messages from './messages';
import { appLocales } from '../../i18n';

export class LocaleToggle extends React.PureComponent {
  render() {
    return <Toggle values={appLocales} messages={messages} />;
  }
}

export default LocaleToggle;
