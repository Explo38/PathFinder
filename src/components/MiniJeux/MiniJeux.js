import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// src/components/MiniJeux/MiniJeux.tsx
import { useState, useEffect } from 'react';
import styles from './MiniJeux.module.css';
import playerImage from './asset/Robotplayer.png';
import machineImage from './asset/RobotMachine.png';
import Switch from './Switch'; // Import du composant Switch
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue
// Fonction pour générer un labyrinthe
const generateMaze = (size) => {
    const maze = Array(size)
        .fill(null)
        .map(() => Array(size).fill(1));
    const carvePath = (x, y) => {
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        directions.sort(() => Math.random() - 0.5);
        directions.forEach(([dx, dy]) => {
            const nx = x + dx * 2;
            const ny = y + dy * 2;
            if (nx > 0 && ny > 0 && nx < size - 1 && ny < size - 1 && maze[nx][ny] === 1) {
                maze[x + dx][y + dy] = 0;
                maze[nx][ny] = 0;
                carvePath(nx, ny);
            }
        });
    };
    maze[1][1] = 0;
    carvePath(1, 1);
    maze[1][0] = 'in';
    maze[size - 2][size - 1] = 'out';
    return maze;
};
const initialMaze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ['in', 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 0, 'out'],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const MiniJeux = () => {
    const { language } = useLanguage(); // Utiliser le contexte de langue
    const [level, setLevel] = useState(1);
    const [maze, setMaze] = useState(initialMaze);
    const [playerPosition, setPlayerPosition] = useState([1, 0]);
    const [machinePosition, setMachinePosition] = useState([1, 0]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [lastTime, setLastTime] = useState(null);
    const [machineRunning, setMachineRunning] = useState(false);
    const [visited, setVisited] = useState(new Set());
    const [isMachineActive, setIsMachineActive] = useState(true); // État pour activer/désactiver le joueur machine
    // Définir les niveaux maximum en fonction de la taille de l'écran
    const getMaxLevel = () => {
        if (window.innerWidth <= 480)
            return 5;
        if (window.innerWidth <= 768)
            return 10;
        if (window.innerWidth <= 1024)
            return 15;
        if (window.innerWidth <= 1440)
            return 20;
        return 26;
    };
    const movePlayer = (rowDelta, colDelta) => {
        setMaze((prevMaze) => {
            const [currentRow, currentCol] = playerPosition;
            const newRow = currentRow + rowDelta;
            const newCol = currentCol + colDelta;
            if (prevMaze[newRow][newCol] === 0 || prevMaze[newRow][newCol] === 'out') {
                setPlayerPosition([newRow, newCol]);
            }
            return prevMaze;
        });
    };
    const moveMachine = () => {
        setMaze((prevMaze) => {
            const [currentRow, currentCol] = machinePosition;
            const directions = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
            ];
            const validMoves = directions.filter(([dx, dy]) => {
                const newRow = currentRow + dx;
                const newCol = currentCol + dy;
                return ((prevMaze[newRow][newCol] === 0 || prevMaze[newRow][newCol] === 'out') &&
                    !(newRow === 1 && newCol === 0) && // Empêche de revenir à la cellule de départ
                    !visited.has(`${newRow},${newCol}`) // Évite de revisiter les cellules
                );
            });
            if (validMoves.length > 0) {
                const [dx, dy] = validMoves[Math.floor(Math.random() * validMoves.length)];
                const newMachinePosition = [currentRow + dx, currentCol + dy];
                setMachinePosition(newMachinePosition);
                setVisited((prevVisited) => new Set(prevVisited).add(`${newMachinePosition[0]},${newMachinePosition[1]}`));
            }
            else {
                // Backtrack si aucun mouvement valide n'est disponible
                const backtrackMoves = directions.filter(([dx, dy]) => {
                    const newRow = currentRow + dx;
                    const newCol = currentCol + dy;
                    return ((prevMaze[newRow][newCol] === 0 || prevMaze[newRow][newCol] === 'out') &&
                        !(newRow === 1 && newCol === 0) // Empêche de revenir à la cellule de départ
                    );
                });
                if (backtrackMoves.length > 0) {
                    const [dx, dy] = backtrackMoves[Math.floor(Math.random() * backtrackMoves.length)];
                    const newMachinePosition = [currentRow + dx, currentCol + dy];
                    setMachinePosition(newMachinePosition);
                }
            }
            return prevMaze;
        });
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!timerRunning) {
                setTimerRunning(true);
                setMachineRunning(true);
            }
            switch (event.key) {
                case 'ArrowUp':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowDown':
                    movePlayer(1, 0);
                    break;
                case 'ArrowLeft':
                    movePlayer(0, -1);
                    break;
                case 'ArrowRight':
                    movePlayer(0, 1);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playerPosition, timerRunning]);
    useEffect(() => {
        let interval = null;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000);
        }
        else if (!timerRunning && timeElapsed !== 0) {
            if (interval)
                clearInterval(interval);
        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [timerRunning, timeElapsed]);
    useEffect(() => {
        let interval = null;
        if (machineRunning && isMachineActive) {
            interval = setInterval(() => {
                moveMachine();
            }, 250); // Déplace la machine toutes les 250 ms
        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [machineRunning, machinePosition, isMachineActive]);
    useEffect(() => {
        const [playerRow, playerCol] = playerPosition;
        if (maze[playerRow][playerCol] === 'out') {
            setTimerRunning(false);
            setMachineRunning(false);
            setLastTime(timeElapsed);
            alert(`Vous avez trouvé la sortie! Temps: ${timeElapsed} secondes`);
        }
    }, [playerPosition, maze, timeElapsed]);
    useEffect(() => {
        const [machineRow, machineCol] = machinePosition;
        if (maze[machineRow][machineCol] === 'out') {
            setMachineRunning(false);
            alert(`La machine a trouvé la sortie!`);
        }
    }, [machinePosition, maze]);
    const handleRestart = () => {
        setPlayerPosition([1, 0]);
        setMachinePosition([1, 0]);
        setVisited(new Set());
        setTimeElapsed(0);
        setTimerRunning(false);
        setMachineRunning(false);
    };
    const handleNextLevel = () => {
        const maxLevel = getMaxLevel();
        setLevel((prevLevel) => {
            const newLevel = prevLevel < maxLevel ? prevLevel + 1 : prevLevel;
            if (newLevel === 1) {
                setMaze(initialMaze);
            }
            else if (newLevel === maxLevel) {
                setMaze(generateMaze(maxLevel * 2 + 9)); // Taille fixe pour le niveau maximum
            }
            else {
                setMaze(generateMaze(newLevel * 2 + 9));
            }
            setPlayerPosition([1, 0]);
            setMachinePosition([1, 0]);
            setVisited(new Set());
            setTimeElapsed(0);
            setTimerRunning(false);
            setMachineRunning(false);
            return newLevel;
        });
    };
    const handlePrevLevel = () => {
        setLevel((prevLevel) => {
            const newLevel = Math.max(1, prevLevel - 1);
            if (newLevel === 1) {
                setMaze(initialMaze);
            }
            else {
                setMaze(generateMaze(newLevel * 2 + 9));
            }
            setPlayerPosition([1, 0]);
            setMachinePosition([1, 0]);
            setVisited(new Set());
            setTimeElapsed(0);
            setTimerRunning(false);
            setMachineRunning(false);
            return newLevel;
        });
    };
    const toggleMachine = () => {
        setIsMachineActive(!isMachineActive);
    };
    const textContent = {
        fr: {
            level: "Niveau",
            timeElapsed: "Temps écoulé",
            lastTime: "Dernier temps",
            prevLevel: "Niveau précédent",
            restart: "Recommencer",
            nextLevel: "Niveau suivant",
            activateMachine: "Activer la machine",
            playerFoundExit: "Vous avez trouvé la sortie! Temps: {time} secondes",
            machineFoundExit: "La machine a trouvé la sortie!"
        },
        en: {
            level: "Level",
            timeElapsed: "Time elapsed",
            lastTime: "Last time",
            prevLevel: "Previous level",
            restart: "Restart",
            nextLevel: "Next level",
            activateMachine: "Activate machine",
            playerFoundExit: "You found the exit! Time: {time} seconds",
            machineFoundExit: "The machine found the exit!"
        }
    };
    return (_jsxs("div", { className: styles.gameContainer, children: [_jsxs("div", { className: styles.levelCounter, children: [textContent[language].level, ": ", level] }), _jsxs("div", { className: styles.timer, children: [textContent[language].timeElapsed, ": ", timeElapsed, " ", language === 'fr' ? 'secondes' : 'seconds'] }), lastTime !== null && _jsxs("div", { className: styles.lastTime, children: [textContent[language].lastTime, ": ", lastTime, " ", language === 'fr' ? 'secondes' : 'seconds'] }), _jsx("div", { className: styles.mazeContainer, children: maze.map((row, rowIndex) => (_jsx("div", { className: styles.row, children: row.map((cell, cellIndex) => {
                        let cellType = '';
                        if (cell === 1) {
                            cellType = 'wall';
                        }
                        else if (cell === 0) {
                            cellType = 'path';
                        }
                        else if (cell === 'in') {
                            cellType = 'start';
                        }
                        else if (cell === 'out') {
                            cellType = 'end';
                        }
                        const isPlayer = playerPosition[0] === rowIndex && playerPosition[1] === cellIndex;
                        const isMachine = machinePosition[0] === rowIndex && machinePosition[1] === cellIndex;
                        return (_jsxs("div", { className: `${styles.cell} ${styles[cellType]}`, children: [isPlayer && _jsx("img", { src: playerImage, alt: "Player", className: styles.playerIcon }), isMachine && isMachineActive && _jsx("img", { src: machineImage, alt: "Machine", className: styles.machineIcon })] }, cellIndex));
                    }) }, rowIndex))) }), _jsxs("div", { className: styles.buttonContainer, children: [_jsx("button", { onClick: handlePrevLevel, className: styles.prevLevelButton, children: textContent[language].prevLevel }), _jsx("button", { onClick: handleRestart, className: styles.restartButton, children: textContent[language].restart }), _jsx("button", { onClick: handleNextLevel, className: styles.nextLevelButton, children: textContent[language].nextLevel })] }), _jsxs("div", { className: styles.switchContainer, children: [_jsxs("span", { children: [textContent[language].activateMachine, ": "] }), _jsx(Switch, { isOn: isMachineActive, handleToggle: toggleMachine, onColor: "#06D6A0" })] })] }));
};
export default MiniJeux;
