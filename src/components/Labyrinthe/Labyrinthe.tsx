import React, { useEffect, useState } from 'react';
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

const path = [
  [1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [4, 1], [5, 1],
  [6, 1], [6, 2], [6, 3], [5, 3], [5, 4], [5, 5], [5, 6], [6, 6], [7, 6],
  [7, 7], [7, 8], [8, 8],
];

type Coordinate = [number, number]; // Type pour une paire de coordonnées [row, col]

const Labyrinthe = () => {
  const { language } = useLanguage(); // Utiliser le contexte de langue
  const [visited, setVisited] = useState<Coordinate[]>([]);
  
  const checkIfMazeIsVisible = () => {
    // Fonction à implémenter si nécessaire
  };

  useEffect(() => {
    window.addEventListener('scroll', checkIfMazeIsVisible);

    return () => {
      window.removeEventListener('scroll', checkIfMazeIsVisible);
    };
  }, []);

  const isPathActive = (rowIndex: number, cellIndex: number) => {
    return visited.some(([vRow, vCell]) => vRow === rowIndex && vCell === cellIndex);
  };

  const title = language === 'fr' ? 'Dernier déplacement du robot' : 'Robot\'s Last Movement';

  return (
    <div>
      <h2 className={styles.labyrinthTitle}>{title}</h2>
      <section className={styles.mazeContainer}>
        <div className={styles.maze}>
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, cellIndex) => {
                let cellType = typeof cell === 'number' ? (cell === 1 ? 'wall' : 'path') : cell;
                return (
                  <div
                    key={cellIndex}
                    className={`${styles[cellType]} ${isPathActive(rowIndex, cellIndex) ? styles.pathActive : ''}`}
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
