// src/components/cardsRobot/Popup.styles.ts
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  position: relative;
  width: 80%;  // ou la largeur souhaitée
  max-width: 1000px;  // ou la largeur maximale souhaitée
  height: 80%;  // ou la hauteur souhaitée
  max-height: 600px;  // ou la hauteur maximale souhaitée
  background-color: #000; // un fond sombre pour faire ressortir l'image
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;  // changer en row pour placer l'image et le texte côte à côte
  padding: 2rem;
`;

export const PopupImage = styled.img`
  width: 40%;  // réduire la taille de l'image
  height: auto;
  border-radius: 20px;
`;

export const DescriptionContainer = styled.div`
  width: 60%;  // le reste de l'espace pour la description
  color: white;
  padding-left: 2rem;  // espacement entre l'image et la description
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const InstructionText = styled.p`
  margin-top: 1rem; // ajuster en fonction de la hauteur de votre image
`;
