import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import styles from './skill.module.css';
import { useLanguage } from '../../context/LanguageContext';
// Composant Skill
const Skill = ({ name, level }) => {
    const radius = 140;
    const circumference = 2 * Math.PI * radius;
    const [isInView, setIsInView] = useState(false);
    const [animatedOffset, setAnimatedOffset] = useState(circumference);
    const ref = useRef(null);
    // Définition de l'animation
    useEffect(() => {
        // Créez une fonction pour mettre à jour l'offset
        const animateCircle = () => {
            // Définissez l'offset final pour l'animation
            const finalOffset = name === "Temps de sortie"
                ? 0
                : circumference - (level / 100) * circumference;
            // Déclenchez l'animation avec une transition
            setAnimatedOffset(finalOffset);
        };
        // Créez l'observer pour déclencher l'animation quand l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true); // Marquez comme visible
                    animateCircle(); // Déclenchez l'animation
                    observer.unobserve(entry.target); // Détachez l'observer
                }
            });
        }, { threshold: 0.1 } // Déclenche l'observer quand 10% de l'élément est visible
        );
        // Attachez l'observer à l'élément référencé
        if (ref.current) {
            observer.observe(ref.current);
        }
        // Nettoyage de l'observer à la destruction du composant
        return () => {
            observer.disconnect();
        };
    }, [level, name, circumference, isInView]);
    // Style pour l'élément circle avec l'animation
    const circleStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: animatedOffset,
        transition: isInView ? 'stroke-dashoffset 2s ease-out' : 'none',
    };
    // Votre conversion de 'level' en affichage approprié
    const levelDisplay = name === "Temps de sortie"
        ? `${Math.floor(level / 60)}min ${level % 60}sec`
        : level.toString();
    return (_jsxs("div", { className: styles.skill, ref: ref, children: [_jsx("div", { className: styles.skillName, children: name }), _jsxs("div", { className: styles.outer, children: [_jsx("div", { className: styles.inner, children: _jsx("div", { className: styles.number, children: levelDisplay }) }), _jsx("div", { className: styles.skillRing, children: _jsxs("svg", { width: "320", height: "320", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: `gradient-${name.replace(/\s/g, '-')}`, children: [_jsx("stop", { offset: "0%", stopColor: "#e91e63" }), _jsx("stop", { offset: "100%", stopColor: "#673ab7" })] }) }), _jsx("circle", { cx: "160", cy: "160", r: radius, stroke: "#ffffff" // Ou une autre couleur pour l'anneau de fond
                                    , strokeWidth: "20", fill: "none", strokeLinecap: "round", transform: "rotate(-90 160 160)" }), _jsx("circle", { cx: "160", cy: "160", r: radius, stroke: `url(#gradient-${name.replace(/\s/g, '-')})`, strokeWidth: "20", fill: "none", strokeLinecap: "round", transform: "rotate(-90 160 160)", style: circleStyle })] }) })] })] }));
};
// Composant SkillsContainer qui récupère les données de l'API et les affiche en utilisant le composant Skill
const SkillsContainer = () => {
    const { language } = useLanguage(); // Utiliser le contexte de langue
    const [performance, setPerformance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('https://yohann.alwaysdata.net/GetAllPerformances')
            .then(res => res.json())
            .then((data) => {
            setPerformance(data);
            setIsLoading(false);
        }, (error) => {
            console.error("Failed to load performance data", error);
            setError(error);
            setIsLoading(false);
        });
    }, []);
    if (error) {
        return _jsxs("div", { children: ["Error: ", error.message] });
    }
    if (isLoading) {
        return _jsx("div", { children: "Loading..." });
    }
    const title = language === 'fr' ? 'Performances' : 'Performances';
    return (_jsxs("div", { children: [_jsx("h2", { className: styles.skillsTitle, children: title }), _jsx("div", { className: styles.skillsContainer, children: performance && (_jsxs(_Fragment, { children: [_jsx(Skill, { name: language === 'fr' ? 'Temps de sortie' : 'Exit Time', level: parseInt(performance.temps_sortie) }), _jsx(Skill, { name: language === 'fr' ? 'Nombre de mouvements' : 'Number of Moves', level: parseInt(performance.nb_mouvements) })] })) })] }));
};
export { SkillsContainer };
