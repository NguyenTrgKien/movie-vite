import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../Home/actionHome";

interface listGenrePayload{
    id: string;
    page: number,
    language: string
}
export const setListgenre = createAsyncThunk(Actiontype.LISTGENRE, async({id, page, language}: listGenrePayload) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${myKey}&with_genres=${id}&page=${page}&language=${language}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})