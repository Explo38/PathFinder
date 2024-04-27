import React, { useEffect, useRef } from 'react';
import './Parallax.module.css'; // Assurez-vous que ce fichier contient les bons styles

import stars from './asset/stars.png';
import planet from './asset/planet.png';
import mountainsBehind from './asset/mountains_behind.png';
import mountainsFrontClaire from './asset/mountains_front_claire.png';
import mountainsFrontDark from './asset/mountains_front_sombre.png';
import mountainsFront from './asset/mountains_front.png';

const ParallaxScene = () => {
  // Références aux éléments pour l'effet parallaxe
  const starsRef = useRef<HTMLImageElement>(null);
  const planetRef = useRef<HTMLImageElement>(null);
  const mountainsBehindRef = useRef<HTMLImageElement>(null);
  const mountainsFrontClaireRef = useRef<HTMLImageElement>(null);
  const mountainsFrontDarkRef = useRef<HTMLImageElement>(null);
  const mountainsFrontRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;

      if (starsRef.current) {
        starsRef.current.style.transform = `translateY(${scrollValue * 0.25}px)`;
      }
      if (planetRef.current) {
        planetRef.current.style.transform = `translateY(${scrollValue * -0.5}px)`;
      }
      if (mountainsBehindRef.current) {
        mountainsBehindRef.current.style.transform = `translateY(${scrollValue * 0.1}px)`;
      }
      if (mountainsFrontClaireRef.current) {
        mountainsFrontClaireRef.current.style.transform = `translateY(${scrollValue * 0.2}px)`;
      }
      if (mountainsFrontDarkRef.current) {
        mountainsFrontDarkRef.current.style.transform = `translateY(${scrollValue * 0.4}px)`;
      }
      if (mountainsFrontRef.current) {
        mountainsFrontRef.current.style.transform = `translateY(${scrollValue * 0.3}px)`;
      }
    };

    // Enregistrer l'événement de défilement avec requestAnimationFrame pour une meilleure performance
    const onScroll = () => {
      window.requestAnimationFrame(handleScroll);
    }

    window.addEventListener('scroll', onScroll);
    
    // Nettoyer l'événement pour éviter des problèmes de mémoire
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="parallax-container">
      <img ref={starsRef} src={stars} alt="Stars" className="stars" />
      <img ref={planetRef} src={planet} alt="Planet" className="planet" />
      <img ref={mountainsBehindRef} src={mountainsBehind} alt="Mountains Behind" className="mountains-behind" />
      <img ref={mountainsFrontClaireRef} src={mountainsFrontClaire} alt="Mountains Front" className="mountains-front-claire" />
      <img ref={mountainsFrontDarkRef} src={mountainsFrontDark} alt="Mountains Front Dark" className="mountains-front-dark" />
      <img ref={mountainsFrontRef} src={mountainsFront} alt="Mountains Front" className="mountains-front" />
      

    </section>
  );
};

export default ParallaxScene;
