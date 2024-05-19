// src/components/Header/SwitchButton.tsx
import React, { useState } from 'react';
import styles from './SwitchButton.module.css';

interface SwitchButtonProps {
  onLanguageChange: (lang: string) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ onLanguageChange }) => {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'fr' : 'en';
    setIsEnglish(!isEnglish);
    onLanguageChange(newLanguage);
  };

  return (
    <div className={styles.switchButton} onClick={toggleLanguage}>
      <div className={`${styles.switchCircle} ${isEnglish ? styles.switchEnglish : styles.switchFrench}`}>
        {isEnglish ? 'EN' : 'FR'}
      </div>
      <div className={styles.switchText}>
        <span className={isEnglish ? styles.inactive : styles.active}>FR</span>
        <span className={isEnglish ? styles.active : styles.inactive}>EN</span>
      </div>
    </div>
  );
};

export default SwitchButton;
