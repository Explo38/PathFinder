import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import Slider from 'react-slick';
import styles from './carouselhorizontal.module.css';
import logoPath from './asset/PathFinder.png';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue

interface Card {
  title: string;
  description: string;
  icon: string;
}

const cards: Record<string, Card[]> = {
  fr: [
    {
      title: 'Autonomie solaire',
      description: 'Grâce à l\'intégration de panneaux solaires de pointe...',
      icon: logoPath,
    },
    {
      title: 'Exploration autonome',
      description: 'Nos robots peuvent explorer sans intervention humaine...',
      icon: logoPath,
    },
    {
      title: 'Technologie avancée',
      description: 'Équipé des dernières technologies pour maximiser l\'efficacité...',
      icon: logoPath,
    },
    {
      title: 'Durabilité exceptionnelle',
      description: 'Conçu pour durer dans les environnements les plus extrêmes...',
      icon: logoPath,
    },
  ],
  en: [
    {
      title: 'Solar Autonomy',
      description: 'Thanks to the integration of advanced solar panels...',
      icon: logoPath,
    },
    {
      title: 'Autonomous Exploration',
      description: 'Our robots can explore without human intervention...',
      icon: logoPath,
    },
    {
      title: 'Advanced Technology',
      description: 'Equipped with the latest technologies to maximize efficiency...',
      icon: logoPath,
    },
    {
      title: 'Exceptional Durability',
      description: 'Designed to last in the most extreme environments...',
      icon: logoPath,
    },
  ]
};

const ScrollHorizontal: React.FC = () => {
  const { language } = useLanguage(); // Utiliser le contexte de langue
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {cards[language].map((card, index) => (
          <div key={index} className={styles.card}>
            <h4>{card.title}</h4>
            <img src={card.icon} alt={card.title} className={styles.icon} />
            <p>{card.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScrollHorizontal;
