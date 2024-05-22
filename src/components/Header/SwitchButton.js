import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Header/SwitchButton.tsx
import { useState } from 'react';
import styles from './SwitchButton.module.css';
const SwitchButton = ({ onLanguageChange }) => {
    const [isEnglish, setIsEnglish] = useState(false);
    const toggleLanguage = () => {
        const newLanguage = isEnglish ? 'fr' : 'en';
        setIsEnglish(!isEnglish);
        onLanguageChange(newLanguage);
    };
    return (_jsxs("div", { className: styles.switchButton, onClick: toggleLanguage, children: [_jsx("div", { className: `${styles.switchCircle} ${isEnglish ? styles.switchEnglish : styles.switchFrench}`, children: isEnglish ? 'EN' : 'FR' }), _jsxs("div", { className: styles.switchText, children: [_jsx("span", { className: isEnglish ? styles.inactive : styles.active, children: "FR" }), _jsx("span", { className: isEnglish ? styles.active : styles.inactive, children: "EN" })] })] }));
};
export default SwitchButton;
