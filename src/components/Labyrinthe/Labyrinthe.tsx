import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './Labyrinthe.module.css';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ["in", 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 0, "out"],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

type Coordinate = [number, number]; // Type pour une paire de coordonnées [row, col]

const Labyrinthe = () => {
  const { language } = useLanguage(); // Utiliser le contexte de langue
  const [path, setPath] = useState<Coordinate[]>([]);
  const [visited, setVisited] = useState<Coordinate[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const response = await axios.get('https://yohann.alwaysdata.net/GetParcours/1');
        const pathData: Coordinate[] = JSON.parse(response.data.Parcours);
        setPath(pathData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchPath();
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          path.forEach((coordinate, index) => {
            setTimeout(() => {
              setVisited(prev => [...prev, coordinate]);
            }, index * 300); // 300ms entre chaque étape
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [path]);

  const isPathActive = (rowIndex: number, cellIndex: number) => {
    return visited.some(([vRow, vCell]) => vRow === rowIndex && vCell === cellIndex);
  };

  const getGradientClass = (index: number) => {
    return `gradient-${index % 20}`; // Assuming we have 20 gradient classes
  };

  const title = language === 'fr' ? 'Dernier déplacement du robot' : 'Robot\'s Last Movement';

  return (
    <div>
      <h2 className={styles.labyrinthTitle}>{title}</h2>
      <section ref={sectionRef} className={styles.mazeContainer}>
        <div className={styles.maze}>
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, cellIndex) => {
                let cellType = typeof cell === 'number' ? (cell === 1 ? 'wall' : 'path') : cell;
                const pathIndex = visited.findIndex(([vRow, vCell]) => vRow === rowIndex && vCell === cellIndex);
                const gradientClass = pathIndex >= 0 ? getGradientClass(pathIndex) : '';
                return (
                  <div
                    key={cellIndex}
                    className={`${styles[cellType]} ${isPathActive(rowIndex, cellIndex) ? `${styles.pathActive} ${styles[gradientClass]}` : ''}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Labyrinthe;
