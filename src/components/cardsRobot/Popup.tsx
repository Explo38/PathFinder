// src/components/cardsRobot/Popup.tsx
import React from 'react';
import { Overlay, PopupContainer, PopupImage, CloseButton, InstructionText } from './Popup.styles';
import Robot_detourer from './asset/robot_detourer.png';

type PopupProps = {
  isVisible: boolean;
  onClose: () => void;
  imageSrc: string;  // Ajoutez cette prop si l'image change dynamiquement
  instructions: string; // Ajoutez cette prop pour les instructions
};

const Popup: React.FC<PopupProps> = ({ isVisible, onClose, imageSrc, instructions }) => {
  if (!isVisible) return null;

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <PopupImage src={Robot_detourer} alt="Vue 3D" />
        <InstructionText>{instructions}</InstructionText>
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;
