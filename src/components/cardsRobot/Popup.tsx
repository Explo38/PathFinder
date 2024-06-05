// src/components/cardsRobot/Popup.tsx
import React from 'react';
import { Overlay, PopupContainer, PopupImage, CloseButton, DescriptionContainer, InstructionText } from './Popup.styles';
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
        <DescriptionContainer>
          <h2>Description du Robot</h2>
          <p>Notre robot autonome navigue intelligemment dans un labyrinthe grâce à l'IA et à une multitude de capteurs sophistiqués.</p>
          <InstructionText>{instructions}</InstructionText>
        </DescriptionContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;
