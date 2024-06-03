import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
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
                  setSuccessMessage('Votre demande a été prise en compte. Vous recevrez un email de confirmation.');
                  setName('');
                  setSurname('');
                  setEmail('');
                  setMessage('');
                  setCharCount(0);
                },
                (userError) => {
                  console.log('Failed to send user email...', userError);
                  setSuccessMessage("Votre demande a été prise en compte, mais une erreur s'est produite lors de l'envoi de l'email de confirmation.");
                }
              );
          },
          (adminError) => {
            console.log('Failed to send admin email...', adminError);
            setSuccessMessage("Erreur lors de l'envoi du message à l'administrateur.");
          }
        );
    } else {
      setSuccessMessage(
        'Veuillez remplir tous les champs et entrer au moins 10 caractères dans la demande.'
      );
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
            Prénom
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
            Nom
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
            Mail
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
            Demande
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
          Envoyer
        </button>
        {successMessage && (
          <div className={styles['success-message']}>{successMessage}</div>
        )}
      </form>
      <span className={styles['privacy-link']} onClick={handlePrivacyLinkClick}>
        Politique de confidentialité
      </span>

      {isPrivacyPopupOpen && (
        <div className={styles['privacy-popup']}>
          <button className={styles['close-button']} onClick={handleClosePrivacyPopup}>
            &times;
          </button>
          <h2>Politique de confidentialité</h2>
          <p>
            Les données des utilisateurs ne sont pas sauvegardées et sont
            uniquement utilisées pour répondre à la demande.
          </p>
        </div>
      )}
    </div>
  );
};

export default Contact;
