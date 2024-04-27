// Ajoutez ceci en haut de votre fichier
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import Slider from 'react-slick';
import styles from './carouselhorizontal.module.css';
import logoPath from './asset/PathFinder.png';
const cards = [
  {
    title: 'Autonomie solaire',
    description: 'Grâce à l\'intégration de panneaux solaires de pointe...',
    icon: logoPath,
  },

  {
    title: 'Autonomie solaire',
    description: 'Grâce à l\'intégration de panneaux solaires de pointe...',
    icon: logoPath,
  },

  {
    title: 'Autonomie solaire',
    description: 'Grâce à l\'intégration de panneaux solaires de pointe...',
    icon: logoPath,
  },

  {
    title: 'Autonomie solaire',
    description: 'Grâce à l\'intégration de panneaux solaires de pointe...',
    icon: logoPath,
  },
  // ...autres objets pour les autres cartes
];

const ScrollHorizontal = () => {
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
        {cards.map((card, index) => (
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
