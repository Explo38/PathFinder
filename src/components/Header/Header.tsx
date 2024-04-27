// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css'; // Importez votre module CSS ici
import logoPath from './asset/PathFinder.png'; // Assurez-vous que le chemin est correct

const Header: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Désactiver le scroll
    document.body.classList.add(styles.bodyNoScroll);

    // Démarrer l'animation après un délai
    const timer = setTimeout(() => {
      setIsAnimated(true);

      // Réactiver le scroll
      document.body.classList.remove(styles.bodyNoScroll);
    }, 2000); // La durée correspond à la durée de votre animation CSS

    // Nettoyer l'effet en cas de démontage du composant
    return () => {
      clearTimeout(timer);
      document.body.classList.remove(styles.bodyNoScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#" className={styles.logoLink}>
          <img src={logoPath} alt="Logo" className={styles.logoImg} />
        </a>
        <span className={`${styles.logo} ${isAnimated ? styles.animatedText : ''}`}>
          PathFinder
        </span> {/* Texte en dehors du lien */}
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="#" className={`${styles.navLink} ${styles.active}`}>Home</a></li>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>About</a></li>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>Work</a></li>
        <li className={styles.navItem}><a href="#" className={styles.navLink}>Contact</a></li>
      </ul>
    </header>
  );
};

export default Header;
