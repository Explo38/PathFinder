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

// Function to add GTM script to the document
const addGTMScript = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M6PWC7T6');
  `;
  document.head.appendChild(script);
};

// Function to add GTM noscript tag to the document
const addGTMNoScript = () => {
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6PWC7T6"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  document.body.appendChild(noscript);
};

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
    addGTMScript();
    addGTMNoScript();
  }, []);

  return (
    <LanguageProvider>
      <Router>
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
