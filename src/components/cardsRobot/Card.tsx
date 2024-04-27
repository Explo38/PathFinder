// src/components/cardsRobot/Card.tsx
import React, { useState, useRef, useEffect } from 'react';
import { CardContainer, CardTitle, CardSubtitle, CardContent, CardButton, CardImage } from './Card.styles';
import Robot_detourer from './asset/robot_detourer.png';

type CardProps = {
  onOpenPopup: () => void;
};

const Card: React.FC<CardProps> = ({ onOpenPopup }) => {
  const [visibility, setVisibility] = useState('hidden');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Remplacez 'visible' par 'hidden' selon l'intersection
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

  return (
    <CardContainer ref={cardRef} className={visibility}>
      <CardContent>
        <CardTitle>La Révolution est là</CardTitle>
        <CardSubtitle>Découvrez de nouveaux horizons</CardSubtitle>
        <p>
          cezfczeczecfvzerfvzefzefregegaegergaerg
          vergvreveverfvrefreveeeeeeeeeeee
          ferrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          ferrrrrrrrrrrrrrrrrrrrrferfer
        </p>
        <CardButton onClick={onOpenPopup}>Vue 3D</CardButton>
      </CardContent>
      <CardImage src={Robot_detourer} alt="Robot détouré" />
    </CardContainer>
  );
};

export default Card;
