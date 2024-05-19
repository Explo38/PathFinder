import { jsx as _jsx } from "react/jsx-runtime";
// src/context/LanguageContext.tsx
import { createContext, useContext, useState } from 'react';
const LanguageContext = createContext(undefined);
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');
    return (_jsx(LanguageContext.Provider, { value: { language, setLanguage }, children: children }));
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
