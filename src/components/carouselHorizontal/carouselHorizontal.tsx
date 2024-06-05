import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import Slider from 'react-slick';
import styles from './carouselhorizontal.module.css';

// Importation des images des capteurs
import accelGyroImage from './asset/acelerometre&gyroscope.png';
import couleurImage from './asset/couleur.png';
import ultrasonImage from './asset/ultrason.png';

import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue

interface Card {
  title: string;
  description: string;
  icon: string;
}

const cards: Record<string, Card[]> = {
  fr: [
    {
      title: 'Accéléromètre + Gyroscope',
      description: '1 accéléromètre et gyroscope : Ces capteurs permettent de mesurer les accélérations linéaires et les rotations, essentiels pour la navigation et la stabilisation du robot.',
      icon: accelGyroImage,
    },
    {
      title: 'Capteur de Couleur',
      description: '1 capteur de couleur : Utilisé pour détecter les couleurs environnantes, ce capteur aide le robot à identifier et différencier les objets en fonction de leur couleur.',
      icon: couleurImage,
    },
    {
      title: 'Capteur Ultrason',
      description: '4 capteurs ultrason : Ces capteurs permettent au robot de mesurer les distances aux objets environnants, essentiels pour éviter les obstacles et naviguer en toute sécurité.',
      icon: ultrasonImage,
    },
  ],
  en: [
    {
      title: 'Accelerometer + Gyroscope',
      description: '1x accelerometer and gyroscope: These sensors measure linear accelerations and rotations, essential for navigation and robot stabilization.',
      icon: accelGyroImage,
    },
    {
      title: 'Color Sensor',
      description: '1x color sensor: Used to detect surrounding colors, this sensor helps the robot identify and differentiate objects based on their color.',
      icon: couleurImage,
    },
    {
      title: 'Ultrasonic Sensor',
      description: '4x ultrasonic sensors: These sensors allow the robot to measure distances to surrounding objects, essential for obstacle avoidance and safe navigation.',
      icon: ultrasonImage,
    },
  ]
};

const ScrollHorizontal: React.FC = () => {
  const { language } = useLanguage(); // Utiliser le contexte de langue
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {cards[language].map((card, index) => (
          <div key={index} className={styles.child}>
            <div className={styles.card}>
              <h4>{card.title}</h4>
              <img src={card.icon} alt={card.title} className={styles.icon} />
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScrollHorizontal;
