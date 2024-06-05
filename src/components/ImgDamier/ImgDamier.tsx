import React, { useState } from 'react';
import styles from './ImgDamier.module.css';

// Importation des images
import lab1 from './asset/lab.jpg';
import lab2 from './asset/lab2.jpg';
import lab3 from './asset/lab3.jpg';
import robot1 from './asset/robotcomplet.png';
import robot2 from './asset/robot2.png';
import robot3 from './asset/robot3.png';
import wideImage from './asset/robotcomplet.png'; // Importez l'image pour la grande case

const images = [
  { id: 1, src: lab1, text: '' },
  { id: 2, src: lab2, text: '' },
  { id: 3, src: lab3, text: '' },
  { id: 4, src: robot1, text: '' },
  { id: 5, src: robot2, text: '' },
  { id: 6, src: robot3, text: '' },
];

const ImgDamier: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <>
      <div className={styles.grid}>
        {images.map((image) => (
          <div
            key={image.id}
            className={`${styles.card} ${selectedId === image.id ? styles.selected : ''}`}
            onClick={() => handleClick(image.id)}
          >
            <img src={image.src} alt={`Image ${image.id}`} className={styles.image} />
            {image.text && <p className={styles.text}>{image.text}</p>}
          </div>
        ))}
      </div>
      <div className={styles.wideCard}>
        <img src={wideImage} alt="Wide Image" className={styles.wideImage} />
      </div>
    </>
  );
};

export default ImgDamier;
