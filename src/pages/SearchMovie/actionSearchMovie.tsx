import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../Home/actionHome";

export const setSearchMovie = createAsyncThunk(Actiontype.SEARCHMOVIE, async(search: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${myKey}&query=${search}`);
        const data = response.json();
        return data;
    }catch(error){
        console.log('Error', error);
        return error;
    }
})