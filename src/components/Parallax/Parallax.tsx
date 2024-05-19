import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './Parallax.module.css';

import starsImage from '/assets/stars.png';
import planetImage from '/assets/planet.png';
import mountainsBehindImage from '/assets/mountains_behind.png';
import mountainsFrontClaireImage from '/assets/mountains_front_claire.png';
import mountainsFrontDarkImage from '/assets/mountains_front_sombre.png';
import mountainsFrontImage from '/assets/mountains_front.png';

const ParallaxScene = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetX(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Désactiver le scroll
    document.body.classList.add(styles.bodyNoScroll);

    // Démarrer l'animation après un délai
    const timer = setTimeout(() => {
      setIsAnimated(true);

      // Réactiver le scroll après la durée de l'animation
      setTimeout(() => {
        document.body.classList.remove(styles.bodyNoScroll);
      }, 2000); // La durée correspond à la durée de votre animation CSS
    }, 2000);

    // Nettoyer l'effet en cas de démontage du composant
    return () => {
      clearTimeout(timer);
      document.body.classList.remove(styles.bodyNoScroll);
    };
  }, []);

  return (
    <div className={styles.parallaxSection}>
      <Parallax pages={1} className={styles.parallaxContainer}>
        <ParallaxLayer offset={0} speed={-0.5} style={{ backgroundImage: `url(${starsImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={-0.5} style={{ backgroundImage: `url(${planetImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={-0.3} style={{ backgroundImage: `url(${mountainsBehindImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ backgroundImage: `url(${mountainsFrontClaireImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ backgroundImage: `url(${mountainsFrontDarkImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ backgroundImage: `url(${mountainsFrontImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 className={`${styles.animatedText} ${isAnimated ? styles.textAppear : ''}`}>
            PathFinder
          </h1>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default ParallaxScene;
