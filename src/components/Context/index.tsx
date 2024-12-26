import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { homeType } from "../../pages/Home/homeSlice";
import { setGenre } from "../../pages/Home/actionHome";
import { setLanguage } from "./actionContext";
import { languageType } from "./contextSlice";

interface contextProps {
    genre: homeType[],
    language: languageType[],
    currentLang: string,
    handleChangeLang: (lang: string) => void
}

export const dataContext = createContext<contextProps>({
    genre: [],
    language: [],
    currentLang: '',
    handleChangeLang: () => {}
}); // phải định nghĩa một giá trị mặc định cho createContext

function Context({children}: {children: React.ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();
    const [currentLang, setCurrentLang] = useState("en-US");
    const genre =  useSelector((state: rootState) => {
        return state.home.genre;
    })
    const handleChangeLang = (lang: string) => {
        setCurrentLang(lang);
    }
    const language = useSelector((state: rootState) => state.context.language);
    
    useEffect(() => {
        if(!genre.length){
            dispatch(setLanguage());
            dispatch(setGenre(currentLang));
        }
    }, [dispatch, genre.length, currentLang]);
    
    return (
        <dataContext.Provider value={{genre, language,currentLang, handleChangeLang}}>
            {children}
        </dataContext.Provider>
    )
}

export default Context;