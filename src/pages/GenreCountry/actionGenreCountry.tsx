import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";
import { myKey } from "../Home/actionHome";

interface genrecountryPayload {
    country: string,
    page: number,
    language: string
}
export const setGenrecountry = createAsyncThunk(Actiontype.GENRECOUNTRY, async({country, page, language}: genrecountryPayload) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${myKey}&with_origin_country=${country}&sort_by=popularity.desc&language=vi&page=${page}&include_adult=false&certification_country=KR&certification.lte=PG-13&language=${language}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})