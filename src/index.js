import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(Router, { basename: "/PathFinder", children: _jsx(LanguageProvider, { children: _jsx(App, {}) }) }) }), document.getElementById('root'));


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


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailjet = require('node-mailjet');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const mailjetClient = mailjet.connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

app.post('/send-email', (req, res) => {
  const { name, surname, email, message } = req.body;

  const userEmailRequest = mailjetClient.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'cyrian.brocardo@gmail.com',
          Name: 'PathFinder Contact',
        },
        To: [
          {
            Email: email,
            Name: `${name} ${surname}`,
          },
        ],
        TemplateID: 5989492, // Remplacez par l'ID de votre modèle
        TemplateLanguage: true,
        Subject: 'Confirmation de demande',
        Variables: {
          name,
          surname,
          email,
          message,
        },
      },
    ],
  });

  const adminEmailRequest = mailjetClient.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'cyrian.brocardo@gmail.com',
          Name: 'PathFinder Contact',
        },
        To: [
          {
            Email: 'contact-pathfinder-newlester@gmail.com',
            Name: 'Admin',
          },
        ],
        Subject: 'Nouvelle demande de contact',
        TextPart: `Nom: ${name}\nPrénom: ${surname}\nEmail: ${email}\nMessage: ${message}`,
      },
    ],
  });

  Promise.all([userEmailRequest, adminEmailRequest])
    .then((result) => {
      res.status(200).send({ message: 'Emails sent successfully' });
    })
    .catch((err) => {
      res.status(500).send({ error: 'Error sending email' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});