// src/components/cardsRobot/cardsRobot.tsx
import React, { useState } from 'react';
import Card from './Card';
import Popup from './Popup';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue

const CardsRobot: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { language } = useLanguage(); // Utiliser le contexte de langue

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const popupInstructions: { [key: string]: string } = {
    fr: "",
    en: ""
  };

  return (
    <div>
      <Card onOpenPopup={handleOpenPopup} />
      <Popup isVisible={popupVisible} onClose={handleClosePopup} imageSrc="" instructions={popupInstructions[language]} />
    </div>
  );
};

export default CardsRobot;
