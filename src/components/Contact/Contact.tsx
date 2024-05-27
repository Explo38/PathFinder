import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && surname && email && message.length >= 10) {
      try {
        const response = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, surname, email, message }),
        });

        if (response.ok) {
          setSuccessMessage('Votre demande a été prise en compte.');
          setName('');
          setSurname('');
          setEmail('');
          setMessage('');
          setCharCount(0);
        } else {
          setSuccessMessage('Erreur lors de l\'envoi du message.');
        }
      } catch (error) {
        setSuccessMessage('Erreur lors de l\'envoi du message.');
      }
    } else {
      setSuccessMessage('Veuillez remplir tous les champs et entrer au moins 10 caractères dans la demande.');
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
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="name">Prénom</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="surname">Nom</label>
          <input
            className={styles.input}
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="email">Mail</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="message">Demande</label>
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
        <button className={styles.button} type="submit">Envoyer</button>
        {successMessage && <div className={styles['success-message']}>{successMessage}</div>}
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
          <p>Les données des utilisateurs ne sont pas sauvegardées et sont uniquement utilisées pour répondre à la demande.</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
