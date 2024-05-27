import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SwitchButton from './SwitchButton';
import logoPath from './asset/PathFinder.png';
import { useLanguage } from '../../context/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isAnimated, setIsAnimated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoPath} alt="Logo" className={styles.logoImg} />
        </Link>
        <span className={`${styles.logo} ${isAnimated ? styles.animatedText : ''}`}>
          PathFinder
        </span>
      </div>
      <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
          <li className={styles.navItem}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              onClick={toggleMenu}
            >
              {language === 'fr' ? 'Menu' : 'Home'}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/mini-jeux"
              className={`${styles.navLink} ${isActive('/mini-jeux') ? styles.active : ''}`}
              onClick={toggleMenu}
            >
              {language === 'fr' ? 'Mini jeux' : 'Mini Games'}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/about"
              className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
              onClick={toggleMenu}
            >
              {language === 'fr' ? 'Qui sommes-nous ?' : 'About Us'}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/contact"
              className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
              onClick={toggleMenu}
            >
              {language === 'fr' ? 'Contact' : 'Contact'}
            </Link>
          </li>
          <li className={styles.navItem}>
            <div className={styles.switchContainer}>
              <SwitchButton onLanguageChange={handleLanguageChange} />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
