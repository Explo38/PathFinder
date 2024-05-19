// src/components/cardsRobot/Card.tsx
import React, { useState, useRef, useEffect } from 'react';
import { CardContainer, CardTitle, CardSubtitle, CardContent, CardButton, CardImage } from './Card.styles';
import Robot_detourer from './asset/robot_detourer.png';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue

type CardProps = {
  onOpenPopup: () => void;
};

const Card: React.FC<CardProps> = ({ onOpenPopup }) => {
  const [visibility, setVisibility] = useState('hidden');
  const cardRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage(); // Utiliser le contexte de langue

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibility(entry.isIntersecting ? 'visible' : 'hidden');
        });
      },
      {
        threshold: 0.1 // Peut-être ajusté selon la portion de l'élément que vous voulez être visible avant de déclencher l'animation
      }
    );

    const currentRef = cardRef.current;
    currentRef && observer.observe(currentRef);

    return () => {
      currentRef && observer.unobserve(currentRef);
    };
  }, []);

  const textContent: { [key: string]: { title: string; subtitle: string; description: string } } = {
    fr: {
      title: "La Révolution est là",
      subtitle: "Découvrez de nouveaux horizons",
      description: "Ceci est la description en français du contenu de la carte. Vous pouvez ajouter des détails supplémentaires ici."
    },
    en: {
      title: "The Revolution is Here",
      subtitle: "Discover New Horizons",
      description: "This is the English description of the card content. You can add more details here."
    }
  };

  return (
    <CardContainer ref={cardRef} className={visibility}>
      <CardContent>
        <CardTitle>{textContent[language].title}</CardTitle>
        <CardSubtitle>{textContent[language].subtitle}</CardSubtitle>
        <p>{textContent[language].description}</p>
        <CardButton onClick={onOpenPopup}>3D View</CardButton>
      </CardContent>
      <CardImage src={Robot_detourer} alt="Robot détouré" />
    </CardContainer>
  );
};

export default Card;
