// src/components/Header/Header.tsx
import React, { useContext, useEffect, useState } from 'react';
import styles from './Header.module.css';
import SwitchButton from './SwitchButton';
import logoPath from './asset/PathFinder.png';
import { useLanguage } from '../../context/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    document.body.classList.add(styles.bodyNoScroll);
    const timer = setTimeout(() => {
      setIsAnimated(true);
      document.body.classList.remove(styles.bodyNoScroll);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove(styles.bodyNoScroll);
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#" className={styles.logoLink}>
          <img src={logoPath} alt="Logo" className={styles.logoImg} />
        </a>
        <span className={`${styles.logo} ${isAnimated ? styles.animatedText : ''}`}>
          PathFinder
        </span>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>{language === 'fr' ? 'Menu' : 'Home'}</a></li>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>{language === 'fr' ? 'Mini jeux' : 'Mini Games'}</a></li>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>{language === 'fr' ? 'Qui sommes-nous ?' : 'About Us'}</a></li>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>{language === 'fr' ? 'Contact' : 'Contact'}</a></li>
      </ul>
      <div className={styles.switchContainer}>
        <SwitchButton onLanguageChange={handleLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
