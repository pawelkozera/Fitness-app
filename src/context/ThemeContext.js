import React, { createContext, useState, useContext } from "react";
import { darkTheme } from "../styles/darkTheme";
import { lightTheme } from "../styles/lightTheme";


const ThemeContext = createContext({
    theme: darkTheme, 
    toggleTheme: () => {}, 
    isDarkTheme: true, 
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme); 
    };

    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
