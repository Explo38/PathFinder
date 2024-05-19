// src/App.tsx
import React from 'react';
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

function App() {
  return (
    <LanguageProvider>
      <Header />
      <TextAccueil />
      <Parallax />
      <Textanim />
      <CardsRobot />
      <Textanim2 />
      <CardsLabyrinthe />
      <Labyrinthe />
      <SkillsContainer />
      <CarouseHorizontal />
    </LanguageProvider>
  );
}

export default App;
