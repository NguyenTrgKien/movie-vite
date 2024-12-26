import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../Home/actionHome";

export const setDetailmovie = createAsyncThunk(Actiontype.DETAILMOVIE, async({id, language}: {id: string, language: string}) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${myKey}&language=${language}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})

export const setSimilar = createAsyncThunk(Actiontype.SIMILAR, async({id, language}: {id: string, language: string}) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${myKey}&language=${language}&page=1`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})

export const setCast = createAsyncThunk(Actiontype.CAST, async({id, language}: {id: string, language: string}) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${myKey}&language=${language}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})