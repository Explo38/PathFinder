// src/components/cardsRobot/cardsRobot.tsx
import React, { useState } from 'react';
import Card from './Card';
import Popup from './Popup';

const CardsRobot: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <Card onOpenPopup={handleOpenPopup} />
      <Popup isVisible={popupVisible} onClose={handleClosePopup} />
    </div>
  );
};

export default CardsRobot;
