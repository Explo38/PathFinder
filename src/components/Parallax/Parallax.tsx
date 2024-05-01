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

  useEffect(() => {
    const handleScroll = () => {
      setOffsetX(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.parallaxSection}>
      <Parallax pages={3} className={styles.parallaxContainer}>
        <ParallaxLayer offset={0} speed={0.5} style={{
          backgroundImage: `url(${starsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: `${offsetX * 0.25}px 0px`
        }} />
        <ParallaxLayer offset={0} speed={-0.5} style={{ backgroundImage: `url(${planetImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={-0.3} style={{ backgroundImage: `url(${mountainsBehindImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ backgroundImage: `url(${mountainsFrontClaireImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ backgroundImage: `url(${mountainsFrontDarkImage})`, backgroundSize: '120%' }} />
        <ParallaxLayer offset={0} speed={0} style={{ backgroundImage: `url(${mountainsFrontImage})`, backgroundSize: '120%' }} />
      </Parallax>
    </div>
  );
};

export default ParallaxScene;
