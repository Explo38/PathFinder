import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(Router, { basename: "/PathFinder", children: _jsx(LanguageProvider, { children: _jsx(App, {}) }) }) }), document.getElementById('root'));
