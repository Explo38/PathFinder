import React from 'react';
import styles from './footer.module.css';
import logoPath from './asset/PathFinder.png'; // Assurez-vous que le chemin du logo est correct
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img src={logoPath} alt="Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem} onClick={() => handleNavigation('/')}>
            {language === 'fr' ? 'Menu' : 'Home'}
          </li>
          <li className={styles.navItem} onClick={() => handleNavigation('/mini-jeux')}>
            {language === 'fr' ? 'Mini jeux' : 'Mini Games'}
          </li>
          <li className={styles.navItem} onClick={() => handleNavigation('/contact')}>
            {language === 'fr' ? 'Contact' : 'Contact'}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
