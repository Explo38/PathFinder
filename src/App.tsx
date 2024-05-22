import React, { useEffect } from 'react';
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
import AnalyticsListener from './AnalyticsListener';

// Composant pour forcer la redirection à la page d'accueil
const RedirectToHome: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <AnalyticsListener />
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <TextAccueil />
              <Parallax />
              <Textanim />
              <CardsRobot />
              <Textanim2 />
              <CardsLabyrinthe />
              <Labyrinthe />
              <SkillsContainer />
              <CarouseHorizontal />
            </>
          } />
          <Route path="/mini-jeux" element={<MiniJeux />} />
          {/* Ajoutez d'autres routes ici si nécessaire */}
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
