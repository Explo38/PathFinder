import { jsx as _jsx } from "react/jsx-runtime";
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(LanguageProvider, { children: _jsx(Router, { children: _jsx(App, {}) }) }) }), document.getElementById('root'));
