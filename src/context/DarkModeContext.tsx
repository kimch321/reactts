import {createContext, ReactNode, useState} from "react";
type DefaultValue = {
    darkMode: boolean;
    toggleDarkMode: () => void;
}
export const DarkModeContext = createContext<DefaultValue>({darkMode:false, toggleDarkMode:() =>{}});

type DarkModeContextProp = {
    children: ReactNode;
}
export function DarkModeProvider({children}: DarkModeContextProp) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode((mode) => !mode);
    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}