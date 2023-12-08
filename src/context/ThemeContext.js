import React, { createContext, useState, useContext } from "react";
import { darkTheme, lightTheme } from "../styles/globalStyles";


const ThemeContext = createContext({
    theme: darkTheme,
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const toggleTheme = () => setIsDarkTheme(!isDarkTheme); 
    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
