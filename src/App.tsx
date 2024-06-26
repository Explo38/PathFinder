import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/footer/footer';
import TextAccueil from './components/textAccueil/textAcceuil';
import Parallax from './components/Parallax/Parallax';
import Textanim from './components/Textanim/Textanim';
import CardsRobot from './components/cardsRobot/cardsRobot';
import Textanim2 from './components/Textanim2/Textanim2';
import CardsLabyrinthe from './components/cardsLabyrinthe/cardsLabyrinthe';
import Labyrinthe from './components/Labyrinthe/Labyrinthe';
import CarouseHorizontal from './components/carouselHorizontal/carouselHorizontal';
import { SkillsContainer } from './components/skill/Skills';
import { LanguageProvider } from './context/LanguageContext';
import MiniJeux from './components/MiniJeux/MiniJeux';
import AnalyticsListener from './AnalyticsListener';
import Contact from './components/Contact/Contact';
import ImgDamier from './components/ImgDamier/ImgDamier';
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="appContainer">
        <Router>
          <AnalyticsListener />
          <Header />
          <main className="content">
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
                  <ImgDamier />
                </>
              } />
              <Route path="/mini-jeux" element={<MiniJeux />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </LanguageProvider>
  );
};

export default App;
