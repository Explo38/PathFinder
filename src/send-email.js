const mailjet = require('node-mailjet');
require('dotenv').config();

const mailjetClient = mailjet.connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, surname, email, message } = JSON.parse(event.body);

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
        TemplateID: 5989492, 
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

  try {
    await Promise.all([userEmailRequest, adminEmailRequest]);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending email' }),
    };
  }
};
