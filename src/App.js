import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import TextAccueil from './components/textAccueil/textAcceuil';
import Parallax from './components/Parallax/Parallax';
import Textanim from './components/Textanim/Textanim';
import Textanim2 from './components/Textanim2/Textanim2';
import Labyrinthe from './components/Labyrinthe/Labyrinthe';
import CardsRobot from './components/cardsRobot/cardsRobot';
import CardsLabyrinthe from './components/cardsLabyrinthe/cardsLabyrinthe';
import CarouseHorizontal from './components/carouselHorizontal/carouselHorizontal';
import { SkillsContainer } from './components/skill/Skills';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import MiniJeux from './components/MiniJeux/MiniJeux';
// Composant pour forcer la redirection à la page d'accueil
const RedirectToHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    }, [navigate]);
    return null;
};
function App() {
    return (_jsx(LanguageProvider, { children: _jsxs(Router, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsxs(_Fragment, { children: [_jsx(TextAccueil, {}), _jsx(Parallax, {}), _jsx(Textanim, {}), _jsx(CardsRobot, {}), _jsx(Textanim2, {}), _jsx(CardsLabyrinthe, {}), _jsx(Labyrinthe, {}), _jsx(SkillsContainer, {}), _jsx(CarouseHorizontal, {})] }) }), _jsx(Route, { path: "/mini-jeux", element: _jsx(MiniJeux, {}) }), _jsx(Route, { path: "*", element: _jsx(RedirectToHome, {}) })] })] }) }));
}
export default App;
