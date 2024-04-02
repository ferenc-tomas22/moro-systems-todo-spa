import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApiProvider, AppContextProvider, ModalProvider, ToastContextProvider } from '@/context';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <AppContextProvider>
        <ApiProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ApiProvider>
      </AppContextProvider>
    </ToastContextProvider>
  </React.StrictMode>
);
