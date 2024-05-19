import React, { useEffect, useState, useRef } from 'react';
import styles from './skill.module.css';
import { useLanguage } from '../../context/LanguageContext';

// Définition de vos interfaces
interface PerformanceData {
  id_performance: string;
  temps_sortie: string;
  nb_mouvements: string;
  Course_idCourse: string;
}

interface SkillProps {
  name: string;
  level: number;
}

// Composant Skill
const Skill: React.FC<SkillProps> = ({ name, level }) => {
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const [isInView, setIsInView] = useState(false);
  const [animatedOffset, setAnimatedOffset] = useState(circumference);
  const ref = useRef<HTMLDivElement>(null);

  // Définition de l'animation
  useEffect(() => {
    // Créez une fonction pour mettre à jour l'offset
    const animateCircle = () => {
      // Définissez l'offset final pour l'animation
      const finalOffset = name === "Temps de sortie"
        ? 0
        : circumference - (level / 100) * circumference;

      // Déclenchez l'animation avec une transition
      setAnimatedOffset(finalOffset);
    };

    // Créez l'observer pour déclencher l'animation quand l'élément est visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true); // Marquez comme visible
            animateCircle(); // Déclenchez l'animation
            observer.unobserve(entry.target); // Détachez l'observer
          }
        });
      },
      { threshold: 0.1 }  // Déclenche l'observer quand 10% de l'élément est visible
    );

    // Attachez l'observer à l'élément référencé
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Nettoyage de l'observer à la destruction du composant
    return () => {
      observer.disconnect();
    };
  }, [level, name, circumference, isInView]);

  // Style pour l'élément circle avec l'animation
  const circleStyle = {
    strokeDasharray: circumference,
    strokeDashoffset: animatedOffset,
    transition: isInView ? 'stroke-dashoffset 2s ease-out' : 'none',
  };

  // Votre conversion de 'level' en affichage approprié
  const levelDisplay = name === "Temps de sortie"
    ? `${Math.floor(level / 60)}min ${level % 60}sec`
    : level.toString();

  return (
    <div className={styles.skill} ref={ref}>
      <div className={styles.skillName}>{name}</div>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.number}>{levelDisplay}</div>
        </div>
        <div className={styles.skillRing}>
          <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`gradient-${name.replace(/\s/g, '-')}`}>
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#673ab7" />
              </linearGradient>
            </defs>
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="#ffffff"  // Ou une autre couleur pour l'anneau de fond
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
            />
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke={`url(#gradient-${name.replace(/\s/g, '-')})`}
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
              style={circleStyle} // Appliquez le style d'animation ici
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Composant SkillsContainer qui récupère les données de l'API et les affiche en utilisant le composant Skill
const SkillsContainer: React.FC = () => {
  const { language } = useLanguage(); // Utiliser le contexte de langue
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('https://yohann.alwaysdata.net/GetAllPerformances')
      .then(res => res.json())
      .then(
        (data) => {
          setPerformance(data);
          setIsLoading(false);
        },
        (error) => {
          console.error("Failed to load performance data", error);
          setError(error);
          setIsLoading(false);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const title = language === 'fr' ? 'Performances' : 'Performances';

  return (
    <div>
      <h2 className={styles.skillsTitle}>{title}</h2>
      <div className={styles.skillsContainer}>
        {performance && (
          <>
            <Skill name={language === 'fr' ? 'Temps de sortie' : 'Exit Time'} level={parseInt(performance.temps_sortie)} />
            <Skill name={language === 'fr' ? 'Nombre de mouvements' : 'Number of Moves'} level={parseInt(performance.nb_mouvements)} />
          </>
        )}
      </div>
    </div>
  );
};

export { SkillsContainer };
