"use client"
import React, {createContext, useContext, useEffect, useState, ReactNode} from "react";

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [darkMode, setDarkMode] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("darkMode");
        if(stored) {
            setDarkMode(stored === "true");
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("darkMode", String(darkMode));
        }
    }, [darkMode, mounted]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return(
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}