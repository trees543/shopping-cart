import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import './assets/index.css';
import App from './components/App';

import { Provider } from './context/data-context';

const rootEl = document.querySelector('#root');
const root = createRoot(rootEl);

root.render(
  <Provider>
    <App />
  </Provider>
);
