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
        to_name: 'Admin', // Vous pouvez également capturer le nom de l'utilisateur ici
        message: message,
        email: email,
      };

      emailjs
        .send(
          '469363931144-qoejf2v27cj', // Remplacez par votre service ID
          'template_l5syvks', // Remplacez par votre template ID
          templateParams,
          'D-_fdE5aiD-PjdL66' // Remplacez par votre user ID
        )
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
            setSuccessMessage('Votre demande a été prise en compte.');
            setName('');
            setSurname('');
            setEmail('');
            setMessage('');
            setCharCount(0);
          },
          (error) => {
            console.log('FAILED...', error);
            setSuccessMessage("Erreur lors de l'envoi du message.");
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
