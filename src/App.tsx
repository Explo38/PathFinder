// src/App.tsx
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
import './App.css'; // Importez le style global


function App() {
  return (
    <>
      <Header />
      <TextAccueil />
      <Parallax />
      < Textanim />
      < CardsRobot />
      < Textanim2 />
      < CardsLabyrinthe />
      < Labyrinthe />
      < SkillsContainer />
      < CarouseHorizontal />
      
      {/* Le reste de votre application */}
    </>
  );
}

export default App;
