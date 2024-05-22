import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/cardsRobot/cardsRobot.tsx
import { useState } from 'react';
import Card from './Card';
import Popup from './Popup';
const CardsRobot = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const handleOpenPopup = () => {
        setPopupVisible(true);
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
    };
    return (_jsxs("div", { children: [_jsx(Card, { onOpenPopup: handleOpenPopup }), _jsx(Popup, { isVisible: popupVisible, onClose: handleClosePopup })] }));
};
export default CardsRobot;
