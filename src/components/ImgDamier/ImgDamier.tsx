import React, { useState } from 'react';
import styles from './ImgDamier.module.css';

const images = [
  { id: 1, src: 'robot_image_url', text: '' },
  { id: 2, src: 'robot_image_url', text: '' },
  { id: 3, src: 'robot_image_url', text: '' },
  { id: 4, src: 'robot_image_url', text: '' },
  { id: 5, src: 'robot_image_url', text: 'gbrbgrgreh trtrthrhhrhtraqr hrtahgrregreghrehrt hjsegregah rtbyeqbqbeqbeqbyq' },
  { id: 6, src: 'robot_image_url', text: '' },
  { id: 7, src: 'robot_image_url', text: '' },
  { id: 8, src: 'robot_image_url', text: '' },
  { id: 9, src: 'robot_image_url', text: 'gbrbgrgreh trtrthrhhrhtraqr hrtahgrregreghrehrt hjsegregah rtbyeqbqbeqbeqbyq' },
];

const ImgDamier: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className={styles.grid}>
      {images.map((image) => (
        <div
          key={image.id}
          className={`${styles.card} ${selectedId === image.id ? styles.selected : ''}`}
          onClick={() => handleClick(image.id)}
        >
          <img src={image.src} alt={`Robot ${image.id}`} className={styles.image} />
          {image.text && <p className={styles.text}>{image.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default ImgDamier;
