// src/components/TextAccueil/textAccueil.tsx
import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './textAccueil.module.css';

const TextAccueil: React.FC = () => {
  // Hook pour gérer l'état du scroll
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      }
    };

    // Ajouter l'écouteur de défilement
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Nettoyer l'écouteur de défilement
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Définir le spring pour animer le texte
  const props = useSpring({
    to: scroll
      ? { opacity: 1, transform: 'translate(0%, 0%)', fontSize: '1em' }
      : { opacity: 0, transform: 'translate(-50%, -50%)', fontSize: '4em' },
    from: { opacity: 0, transform: 'translate(-50%, -50%)', fontSize: '4em' },
  });

  return (
    <animated.div style={props} className={styles.text}>
      Pathfinder
    </animated.div>
  );
};

export default TextAccueil;
