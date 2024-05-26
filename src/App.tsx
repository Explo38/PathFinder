import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import MiniJeux from './components/MiniJeux/MiniJeux';
import AnalyticsListener from './AnalyticsListener';
import Contact from './components/Contact/Contact';
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <AnalyticsListener />
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
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
            } 
          />
          <Route path="/mini-jeux" element={<MiniJeux />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
