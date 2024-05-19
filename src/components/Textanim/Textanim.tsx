import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Textanim.module.css';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationSection: React.FC = () => {
  const { language } = useLanguage(); // Utiliser le contexte de langue
  const sectionRef = useRef<HTMLDivElement>(null); // Référence à la section pour le déclencheur
  const textRef = useRef<HTMLHeadingElement>(null); // Référence au texte à animer

  useEffect(() => {
    // Création de l'animation avec ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // Élément déclencheur de l'animation
        start: "top bottom", // L'animation commence quand le haut de la section touche le bas de l'écran
        end: "center center", // Fin ajustée pour une meilleure réactivité
        toggleActions: "play none none reverse", // Actions lors des différents événements de scroll
        onEnter: () => console.log('Entering section'), // Log quand on entre dans la section
        onLeave: () => console.log('Leaving section'), // Log quand on quitte la section
        onEnterBack: () => console.log('Entering section from bottom'), // Log quand on entre dans la section par le bas
        onLeaveBack: () => console.log('Leaving section to top'), // Log quand on quitte la section par le haut
      }
    });

    // Animation du texte de l'opacité 0 à 1
    tl.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

    return () => {
      // Nettoyage des triggers pour éviter les fuites de mémoire
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const headingText = language === 'fr' 
    ? 'Explorer de nouveaux horizons grâce à notre robot autonome'
    : 'Explore new horizons with our autonomous robot';

  return (
    <section className={styles.mazeContainer}>
      <div ref={sectionRef} className={styles.section}>
        <h1 ref={textRef} className={styles.heading}>
          {headingText}
        </h1>
      </div>
    </section>
  );
};

export default ScrollAnimationSection;
