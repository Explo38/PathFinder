import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/cardsRobot/Card.tsx
import { useState, useRef, useEffect } from 'react';
import { CardContainer, CardTitle, CardSubtitle, CardContent, CardButton, CardImage } from './Card.styles';
import Robot_detourer from './asset/lab.png';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue
const Card = ({ onOpenPopup }) => {
    const [visibility, setVisibility] = useState('hidden');
    const cardRef = useRef(null);
    const { language } = useLanguage(); // Utiliser le contexte de langue
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setVisibility(entry.isIntersecting ? 'visible' : 'hidden');
            });
        }, {
            threshold: 0.1 // Peut-être ajusté selon la portion de l'élément que vous voulez être visible avant de déclencher l'animation
        });
        const currentRef = cardRef.current;
        currentRef && observer.observe(currentRef);
        return () => {
            currentRef && observer.unobserve(currentRef);
        };
    }, []);
    const textContent = {
        fr: {
            title: "Venez découvrir notre labyrinthe",
            subtitle: "",
            button: "Vue 3D"
        },
        en: {
            title: "Come explore our labyrinth",
            subtitle: "",
            button: "3D View"
        }
    };
    return (_jsxs(CardContainer, { ref: cardRef, className: visibility, children: [_jsxs(CardContent, { children: [_jsx(CardTitle, { children: textContent[language].title }), _jsx(CardSubtitle, { children: textContent[language].subtitle }), _jsx("p", { children: textContent[language].subtitle }), _jsx(CardButton, { onClick: onOpenPopup, children: textContent[language].button })] }), _jsx(CardImage, { src: Robot_detourer, alt: "Robot d\u00E9tour\u00E9" })] }));
};
export default Card;
