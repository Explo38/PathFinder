import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SwitchButton from './SwitchButton';
import logoPath from './asset/PathFinder.png';
import { useLanguage } from '../../context/LanguageContext';
const Header = () => {
    const { language, setLanguage } = useLanguage();
    const [isAnimated, setIsAnimated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (_jsxs("header", { className: styles.header, children: [_jsxs("div", { className: styles.logoContainer, children: [_jsx(Link, { to: "/", className: styles.logoLink, children: _jsx("img", { src: logoPath, alt: "Logo", className: styles.logoImg }) }), _jsx("span", { className: `${styles.logo} ${isAnimated ? styles.animatedText : ''}`, children: "PathFinder" })] }), _jsxs("div", { className: `${styles.hamburger} ${menuOpen ? styles.open : ''}`, onClick: toggleMenu, children: [_jsx("div", { className: styles.bar1 }), _jsx("div", { className: styles.bar2 }), _jsx("div", { className: styles.bar3 })] }), _jsx("nav", { className: `${styles.nav} ${menuOpen ? styles.open : ''}`, children: _jsxs("ul", { className: `${styles.navList} ${menuOpen ? styles.open : ''}`, children: [_jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/", className: `${styles.navLink} ${isActive('/') ? styles.active : ''}`, onClick: toggleMenu, children: language === 'fr' ? 'Menu' : 'Home' }) }), _jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/mini-jeux", className: `${styles.navLink} ${isActive('/mini-jeux') ? styles.active : ''}`, onClick: toggleMenu, children: language === 'fr' ? 'Mini jeux' : 'Mini Games' }) }), _jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/about", className: `${styles.navLink} ${isActive('/about') ? styles.active : ''}`, onClick: toggleMenu, children: language === 'fr' ? 'Qui sommes-nous ?' : 'About Us' }) }), _jsx("li", { className: styles.navItem, children: _jsx(Link, { to: "/contact", className: `${styles.navLink} ${isActive('/contact') ? styles.active : ''}`, onClick: toggleMenu, children: language === 'fr' ? 'Contact' : 'Contact' }) }), _jsx("li", { className: styles.navItem, children: _jsx("div", { className: styles.switchContainer, children: _jsx(SwitchButton, { onLanguageChange: handleLanguageChange }) }) })] }) })] }));
};
export default Header;
