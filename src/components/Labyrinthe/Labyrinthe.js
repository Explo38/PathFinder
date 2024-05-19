import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
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
const Labyrinthe = () => {
    const { language } = useLanguage(); // Utiliser le contexte de langue
    const [visited, setVisited] = useState([]);
    const checkIfMazeIsVisible = () => {
        // Fonction à implémenter si nécessaire
    };
    useEffect(() => {
        window.addEventListener('scroll', checkIfMazeIsVisible);
        return () => {
            window.removeEventListener('scroll', checkIfMazeIsVisible);
        };
    }, []);
    const isPathActive = (rowIndex, cellIndex) => {
        return visited.some(([vRow, vCell]) => vRow === rowIndex && vCell === cellIndex);
    };
    const title = language === 'fr' ? 'Dernier déplacement du robot' : 'Robot\'s Last Movement';
    return (_jsxs("div", { children: [_jsx("h2", { className: styles.labyrinthTitle, children: title }), _jsx("section", { className: styles.mazeContainer, children: _jsx("div", { className: styles.maze, children: maze.map((row, rowIndex) => (_jsx("div", { className: styles.row, children: row.map((cell, cellIndex) => {
                            let cellType = typeof cell === 'number' ? (cell === 1 ? 'wall' : 'path') : cell;
                            return (_jsx("div", { className: `${styles[cellType]} ${isPathActive(rowIndex, cellIndex) ? styles.pathActive : ''}` }, cellIndex));
                        }) }, rowIndex))) }) })] }));
};
export default Labyrinthe;
