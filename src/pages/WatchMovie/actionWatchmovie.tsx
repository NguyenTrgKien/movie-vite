import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../Home/actionHome";

export const setTrailer = createAsyncThunk(Actiontype.TRAILER, async({id, language}: {id: string, language: string}) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${myKey}&language=${language}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})