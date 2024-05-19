import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Header/Header.tsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SwitchButton from './SwitchButton';
import logoPath from './asset/PathFinder.png';
import { useLanguage } from '../../context/LanguageContext';
const Header = () => {
    const { language, setLanguage } = useLanguage();
    const [isAnimated, setIsAnimated] = useState(false);
    const location = useLocation();
    useEffect(() => {
        document.body.classList.add(styles.bodyNoScroll);
        const timer = setTimeout(() => {
            setIsAnimated(true);
            document.body.classList.remove(styles.bodyNoScroll);
        }, 2000);
        return () => {
            clearTimeout(timer);
            document.body.classList.remove(styles.bodyNoScroll);
        };
    }, []);
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };
    const isActive = (path) => location.pathname === path;
    return (_jsxs("header", { className: styles.header, children: [_jsxs("div", { className: styles.logoContainer, children: [_jsx(Link, { to: "/", className: styles.logoLink, children: _jsx("img", { src: logoPath, alt: "Logo", className: styles.logoImg }) }), _jsx("span", { className: `${styles.logo} ${isAnimated ? styles.animatedText : ''}`, children: "PathFinder" })] }), _jsxs("ul", { className: styles.navList, children: [_jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/", className: `${styles.navLink} ${isActive('/') ? styles.active : ''}`, children: language === 'fr' ? 'Menu' : 'Home' }) }), _jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/mini-jeux", className: `${styles.navLink} ${isActive('/mini-jeux') ? styles.active : ''}`, children: language === 'fr' ? 'Mini jeux' : 'Mini Games' }) }), _jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/about", className: `${styles.navLink} ${isActive('/about') ? styles.active : ''}`, children: language === 'fr' ? 'Qui sommes-nous ?' : 'About Us' }) }), _jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/contact", className: `${styles.navLink} ${isActive('/contact') ? styles.active : ''}`, children: language === 'fr' ? 'Contact' : 'Contact' }) })] }), _jsx("div", { className: styles.switchContainer, children: _jsx(SwitchButton, { onLanguageChange: handleLanguageChange }) })] }));
};
export default Header;
