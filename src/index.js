import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { LocaleProvider } from 'contexts/Locale';
// import * as Locale from 'contexts/Language';
import LanguageProvider from 'containers/LanguageProvider';
import 'antd/dist/antd.css';
import App from './App';
import { translationMessages } from './i18n';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider>
      <LanguageProvider messages={translationMessages}>
        <App />
      </LanguageProvider>
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
