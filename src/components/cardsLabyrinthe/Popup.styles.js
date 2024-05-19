// src/components/cardsRobot/Popup.styles.ts
import styled from 'styled-components';
export const Overlay = styled.div `
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
export const PopupContainer = styled.div `
  position: relative;
  width: 80%;  // ou la largeur souhaitée
  max-width: 1000px;  // ou la largeur maximale souhaitée
  height: 80%;  // ou la hauteur souhaitée
  max-height: 600px;  // ou la hauteur maximale souhaitée
  background-color: #000; // un fond sombre pour faire ressortir l'image
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;  // cela place le texte en bas
  padding: 2rem;
`;
export const PopupImage = styled.img `
  width: 100%;
  height: auto;
  border-radius: 20px;
`;
export const CloseButton = styled.button `
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;
export const InstructionText = styled.p `
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: white;
  padding: 10px 0; // Ajoute un peu d'espacement autour du texte
  margin: 0; // Enlève les marges par défaut du paragraphe
  box-sizing: border-box; // S'assure que le padding est inclus dans la largeur et hauteur
`;
