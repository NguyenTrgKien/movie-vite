import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../../pages/Home/actionHome";

export const setLanguage = createAsyncThunk(Actiontype.LANGUAGE, async() => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${myKey}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})