const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, surname, email, message } = JSON.parse(event.body);

  // Configurer le transporteur SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, // Votre email Gmail
      pass: process.env.GMAIL_PASS, // Votre mot de passe Gmail
    },
  });

  // Email à envoyer à l'utilisateur
  const userMailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Confirmation de demande',
    text: `Bonjour ${name} ${surname},\n\nMerci pour votre demande. Nous vous répondrons sous peu.\n\nVotre message:\n${message}`,
  };

  // Email à envoyer à l'administrateur
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: 'pathfinder.contact.newslestter@gmail.com', // Email de l'administrateur
    subject: 'Nouvelle demande de contact',
    text: `Nom: ${name}\nPrénom: ${surname}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending email' }),
    };
  }
};
