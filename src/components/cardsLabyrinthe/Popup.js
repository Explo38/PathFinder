import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/cardsRobot/Popup.tsx
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Overlay, PopupContainer, CloseButton, InstructionText } from './Popup.styles';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte de langue
const Popup = ({ isVisible, onClose }) => {
    if (!isVisible)
        return null;
    const mountRef = useRef(null);
    const { language } = useLanguage(); // Utiliser le contexte de langue
    const instructionTexts = {
        fr: "Utilisez le clic gauche ainsi que la molette de défilement pour zoomer et explorer la vue 3D.",
        en: "Use the left click and the scroll wheel to zoom and explore the 3D view."
    };
    useEffect(() => {
        if (!mountRef.current)
            return;
        // Scène, caméra, et renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.set(30, 25, 50); // La position initiale de la caméra
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);
        // Lumière
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);
        // Loader
        const loader = new GLTFLoader();
        loader.load('/labyrinthe.glb', // Chemin vers le modèle 3D dans le dossier public
        (gltf) => {
            // Ajuster la position et l'échelle du modèle au besoin
            gltf.scene.position.set(0, 0, 0); // Position au centre de la scène
            scene.add(gltf.scene);
            // Rendu après le chargement
            renderer.render(scene, camera);
        }, undefined, (error) => {
            console.error('An error happened:', error);
        });
        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(15, 0, 25); // Cible au centre de la scène, là où le modèle est placé
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        // Fonction d'animation
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Mise à jour des contrôles Orbit
            renderer.render(scene, camera);
        };
        animate();
        // Nettoyage
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);
    return (_jsx(Overlay, { children: _jsxs(PopupContainer, { children: [_jsx(CloseButton, { onClick: onClose, children: "\u00D7" }), _jsx("div", { ref: mountRef, style: { width: '100%', height: '100%' } }), _jsx(InstructionText, { children: instructionTexts[language] })] }) }));
};
export default Popup;
