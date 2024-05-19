import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/cardsRobot/cardsRobot.tsx
import { useState } from 'react';
import Card from './Card';
import Popup from './Popup';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue
const CardsRobot = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const { language } = useLanguage(); // Utiliser le contexte de langue
    const handleOpenPopup = () => {
        setPopupVisible(true);
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
    };
    const popupInstructions = {
        fr: "Utilisez la molette de défilement vers le bas pour commencer la vue 3D.",
        en: "Use the scroll wheel to start the 3D view."
    };
    return (_jsxs("div", { children: [_jsx(Card, { onOpenPopup: handleOpenPopup }), _jsx(Popup, { isVisible: popupVisible, onClose: handleClosePopup, imageSrc: "", instructions: popupInstructions[language] })] }));
};
export default CardsRobot;
