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
      } else {
        setScroll(false);
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
      ? { opacity: 1, transform: 'translate(-50%, -50%)', fontSize: '1em', top: '20px', left: '20px' }
      : { opacity: 1, transform: 'translate(-50%, -50%)', fontSize: '4em', top: '50%', left: '50%' },
    from: { opacity: 0, transform: 'translate(-50%, -50%)', fontSize: '4em', top: '50%', left: '50%' },
  });

  return (
    <animated.div style={props} className={styles.text}>
     
    </animated.div>
  );
};

export default TextAccueil;
