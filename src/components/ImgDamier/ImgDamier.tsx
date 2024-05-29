import React from 'react';
import styles from './ImgDamier.module.css';

const images = [
  { src: 'path_to_image1', text: '' },
  { src: 'path_to_image2', text: 'gbrebgregh trtrthtrhrhtrhqahr hrtqhgrqregregreghrt hjsqereqh rtbyeqgbqbeqebqyq' },
  { src: 'path_to_image3', text: '' },
  { src: 'path_to_image4', text: '' },
  { src: 'path_to_image5', text: 'gbrebgregh trtrthtrhrhtrhqahr hrtqhgrqregregreghrt hjsqereqh rtbyeqgbqbeqebqyq' },
  { src: 'path_to_image6', text: '' },
  { src: 'path_to_image7', text: '' },
  { src: 'path_to_image8', text: '' },
];

const ImgDamier = () => {
  return (
    <div className={styles.grid}>
      {images.map((item, index) => (
        <div key={index} className={`${styles.gridItem} ${styles[`item-${index}`]}`}>
          <img src={item.src} alt={`robot-${index}`} className={styles.image} />
          {item.text && <p className={styles.text}>{item.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default ImgDamier;
