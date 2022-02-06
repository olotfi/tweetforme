import React from 'react';
import ReactDOM from 'react-dom';
import { App, RootProvider } from './App';

ReactDOM.render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
