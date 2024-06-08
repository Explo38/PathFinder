import React, { useState } from 'react';
import styles from './ImgDamier.module.css';
import { useLanguage } from '../../context/LanguageContext';

// Importation des images
import lab1 from './asset/lab.jpg';
import lab2 from './asset/lab2.jpg';
import lab3 from './asset/lab3.jpg';
import robot1 from './asset/robotcomplet.png';
import robot2 from './asset/robot2.png';
import robot3 from './asset/robot3.png';
import wideImage from './asset/groupe.png'; // Importez l'image pour la grande case

// Importation des photos de profil
import profileIliana from './asset/iliana.png';
import profileCyrian from './asset/cyrian.png';
import profileYohann from './asset/yohann.png';
import profileNathan from './asset/nathan.png';

const images = [
  { id: 1, src: lab1, text: '' },
  { id: 2, src: lab2, text: '' },
  { id: 3, src: lab3, text: '' },
  { id: 4, src: robot1, text: '' },
  { id: 5, src: robot2, text: '' },
  { id: 6, src: robot3, text: '' },
];

const textContent = {
  fr: {
    presentation: "Nous sommes 4 étudiant de BTS SNIR au Lycée Saint Michel Annecy. Pathfinder est née suite à la présentation de nos projet finaux, qui était de faire un robot se déplaçant dans un labyrinthe en toute autonomie.",
    profiles: [
      { name: 'Iliana', role: 'Jeux de donnée', photo: profileIliana },
      { name: 'Cyrian', role: 'Site Web', photo: profileCyrian },
      { name: 'Yohann', role: 'API & Base de donnée', photo: profileYohann },
      { name: 'Nathan', role: 'Développement du robot', photo: profileNathan },
    ]
  },
  en: {
    presentation: "We are 4 students of BTS SNIR at Lycée Saint Michel Annecy. Pathfinder was born following the presentation of our final projects, which was to make a robot that moves in a maze autonomously.",
    profiles: [
      { name: 'Iliana', role: 'Data Games', photo: profileIliana },
      { name: 'Cyrian', role: 'Website', photo: profileCyrian },
      { name: 'Yohann', role: 'API & Database', photo: profileYohann },
      { name: 'Nathan', role: 'Robot Development', photo: profileNathan },
    ]
  }
};

const ImgDamier: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { language, setLanguage } = useLanguage();

  const handleClick = (id: number) => {
    setSelectedId(id);
  };

  const content = textContent[language as 'fr' | 'en'];

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
      <div className={styles.presentationCard}>
        <div className={styles.left}>
          <img src={wideImage} alt="Group Image" className={styles.groupImage} />
          <p className={styles.presentationText}>
            {content.presentation}
          </p>
        </div>
        <div className={styles.right}>
          {content.profiles.map((profile, index) => (
            <div className={styles.profile} key={index}>
              <div className={styles.profilePic}>
                <img src={profile.photo} alt={profile.name} className={styles.profileImage} />
              </div>
              <p>{profile.name}</p>
              <p>{profile.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImgDamier;
