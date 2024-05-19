// src/components/Header/Header.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SwitchButton from './SwitchButton';
import logoPath from './asset/PathFinder.png';
import { useLanguage } from '../../context/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isAnimated, setIsAnimated] = useState(false);
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoPath} alt="Logo" className={styles.logoImg} />
        </Link>
        <span className={`${styles.logo} ${isAnimated ? styles.animatedText : ''}`}>
          PathFinder
        </span>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            {language === 'fr' ? 'Menu' : 'Home'}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/mini-jeux"
            className={`${styles.navLink} ${isActive('/mini-jeux') ? styles.active : ''}`}
          >
            {language === 'fr' ? 'Mini jeux' : 'Mini Games'}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/about"
            className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
          >
            {language === 'fr' ? 'Qui sommes-nous ?' : 'About Us'}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/contact"
            className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
          >
            {language === 'fr' ? 'Contact' : 'Contact'}
          </Link>
        </li>
      </ul>
      <div className={styles.switchContainer}>
        <SwitchButton onLanguageChange={handleLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
