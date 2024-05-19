import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/PathFinder">
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
