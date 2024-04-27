import React, { useEffect, useState } from 'react';
import styles from './Labyrinthe.module.css';

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
  const [visited, setVisited] = useState<Coordinate[]>([]);
  

  // Fonction pour vérifier si le labyrinthe est visible à l'écran
  const checkIfMazeIsVisible = () => {
    
  };

  useEffect(() => {
    // Ajouter l'écouteur de scroll pour vérifier si le labyrinthe est visible
    window.addEventListener('scroll', checkIfMazeIsVisible);

    // Nettoyer l'écouteur de scroll sur le démontage du composant
    return () => {
      window.removeEventListener('scroll', checkIfMazeIsVisible);
    };
  }, []);

  // Vérifie si la cellule actuelle a été visitée pour appliquer la classe CSS correspondante
  const isPathActive = (rowIndex: number, cellIndex: number) => {
    return visited.some(([vRow, vCell]) => vRow === rowIndex && vCell === cellIndex);
  };

  return (
    <div>
      <h2 className={styles.labyrinthTitle}>Dernier déplacement du robot</h2>
      <section className={styles.mazeContainer} >
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
