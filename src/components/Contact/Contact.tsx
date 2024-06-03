import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './Contact.module.css';
import { useLanguage } from '../../context/LanguageContext';

const Contact: React.FC = () => {
  const { language } = useLanguage(); // Utilisez le contexte de langue
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && surname && email && message.length >= 10) {
      const templateParams = {
        from_name: `${name} ${surname}`,
        to_name: 'Admin',
        message: message,
        reply_to: email, // Assurez-vous d'inclure `reply_to` ici
      };

      // Envoyer l'email à l'administrateur
      emailjs
        .send(
          '469363931144-qoejf2v27cj', // Remplacez par votre service ID 
          'template_l5syvks', // Remplacez par votre template ID
          templateParams,
          'D-_fdE5aiD-PjdL66' // Remplacez par votre user ID
        )
        .then(
          (response) => {
            console.log('Admin email sent!', response.status, response.text);

            // Envoyer l'email de confirmation à l'utilisateur
            emailjs
              .send(
                '469363931144-qoejf2v27cj', // Remplacez par votre service ID 
                'template_mj09l48', // Remplacez par votre template ID
                templateParams,
                'D-_fdE5aiD-PjdL66' // Remplacez par votre user ID
              )
              .then(
                (userResponse) => {
                  console.log('User email sent!', userResponse.status, userResponse.text);
                  setSuccessMessage(language === 'fr' ? 'Votre demande a été prise en compte. Vous recevrez un email de confirmation.' : 'Your request has been received. You will receive a confirmation email.');
                  setName('');
                  setSurname('');
                  setEmail('');
                  setMessage('');
                  setCharCount(0);
                },
                (userError) => {
                  console.log('Failed to send user email...', userError);
                  setSuccessMessage(language === 'fr' ? "Votre demande a été prise en compte, mais une erreur s'est produite lors de l'envoi de l'email de confirmation." : 'Your request has been received, but an error occurred while sending the confirmation email.');
                }
              );
          },
          (adminError) => {
            console.log('Failed to send admin email...', adminError);
            setSuccessMessage(language === 'fr' ? "Erreur lors de l'envoi du message à l'administrateur." : 'Error sending the message to the administrator.');
          }
        );
    } else {
      setSuccessMessage(language === 'fr' ? 'Veuillez remplir tous les champs et entrer au moins 10 caractères dans la demande.' : 'Please fill in all fields and enter at least 10 characters in the request.');
    }
  };

  const handlePrivacyLinkClick = () => {
    setIsPrivacyPopupOpen(true);
  };

  const handleClosePrivacyPopup = () => {
    setIsPrivacyPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} name="contact">
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="name">
            {language === 'fr' ? 'Prénom' : 'First Name'}
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="surname">
            {language === 'fr' ? 'Nom' : 'Last Name'}
          </label>
          <input
            className={styles.input}
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="email">
            {language === 'fr' ? 'Mail' : 'Email'}
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="message">
            {language === 'fr' ? 'Demande' : 'Request'}
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            maxLength={500}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setCharCount(e.target.value.length);
            }}
          />
          <div className={styles.counter}>{charCount}/500</div>
        </div>
        <button className={styles.button} type="submit">
          {language === 'fr' ? 'Envoyer' : 'Send'}
        </button>
        {successMessage && (
          <div className={styles['success-message']}>{successMessage}</div>
        )}
      </form>
      <span className={styles['privacy-link']} onClick={handlePrivacyLinkClick}>
        {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
      </span>

      {isPrivacyPopupOpen && (
        <div className={styles['privacy-popup']}>
          <button className={styles['close-button']} onClick={handleClosePrivacyPopup}>
            &times;
          </button>
          <h2>{language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}</h2>
          <p>
            {language === 'fr' ? "Les données des utilisateurs ne sont pas sauvegardées et sont uniquement utilisées pour répondre à la demande." : "User data is not saved and is only used to respond to the request."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Contact;
