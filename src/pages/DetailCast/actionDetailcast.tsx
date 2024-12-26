import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../Home/actionHome";

export const setDetailcast = createAsyncThunk(Actiontype.DETAILCAST, async({id, language}: {id: string, language: string}) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${myKey}&language=${language}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})

export const setMoviecast = createAsyncThunk(Actiontype.MOVIECAST, async({id, language}: {id: string, language: string}) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${myKey}&language=${language}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})