// src/components/cardsRobot/Card.styles.ts
import styled, { keyframes } from 'styled-components';
const fadeInUp = keyframes `
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeOutDown = keyframes `
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;
export const CardTitle = styled.h1 `
  font-size: 2.5rem; /* Adjust size as needed */
  margin: 0;
`;
export const CardSubtitle = styled.h2 `
  font-size: 1.5rem; /* Adjust size as needed */
  opacity: 0.9;
  margin: 1rem 0;
`;
export const CardContent = styled.p `
  font-size: 1rem; /* Adjust size as needed */
  line-height: 1.5;
  margin: 1rem 0;
  max-width: 60%;
`;
export const CardButton = styled.button `
  background-color: #fff;
  color: #662D8C;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-size: 1rem; /* Adjust size as needed */
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  align-self: center;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
  }
`;
export const CardContainer = styled.div `
visibility: hidden; // Cacher initialement
  &.visible {
    visibility: visible;
    animation: ${fadeInUp} 1.5s ease forwards;
  }
  &.hidden {
    visibility: hidden;
    animation: ${fadeOutDown} 1.5s ease forwards;
  }
  
  background: linear-gradient(135deg, #662D8C 0%, #ED1E79 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row; // changé pour row pour disposer les éléments horizontalement
  align-items: center; // aligner les éléments verticalement au centre
  justify-content: space-between; // répartir l'espace horizontalement
  position: relative;
  overflow: hidden;
  max-width: 800px; // augmenter la largeur selon l'image
  margin: 100px auto;
  height: auto; // hauteur automatique pour s'adapter au contenu
`;
export const CardImage = styled.img `
  width: 40%; // ajuster la largeur de l'image
  object-fit: cover; // pour s'assurer que l'image couvre bien l'espace sans se déformer
  margin-left: 2rem; // pour un petit espace entre le texte et l'image
`;
