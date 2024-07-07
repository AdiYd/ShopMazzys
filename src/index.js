import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/App.css';
import './style/style.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import {colorThemeDark, inputTheme, themeFull} from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeFull}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
