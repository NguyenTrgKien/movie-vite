export const myKey = '122d1263283f2d9f0ac96a53bbf7e793';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Actiontype } from "../../redux/type";

export const setPopular = createAsyncThunk(Actiontype.POPULAR, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${myKey}&language=${language}&page=1`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})
export const setGenre = createAsyncThunk(Actiontype.GENRE, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${myKey}&language=${language}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})

export const setTrending = createAsyncThunk(Actiontype.TRENDING, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${myKey}&language=${language}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})

export const setUpcoming = createAsyncThunk(Actiontype.UPCOMING, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${myKey}&language=${language}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})

export const setToprated = createAsyncThunk(Actiontype.TOPRATED, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${myKey}&language=${language}&page=1`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})

export const setAnimation = createAsyncThunk(Actiontype.ANIMATION, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=16&language=${language}&page=1&api_key=${myKey}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})

export const setNewmovie = createAsyncThunk(Actiontype.NEWMOVIE, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${myKey}&language=${language}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})

export const setAdventure = createAsyncThunk(Actiontype.ADVENTURE, async(language: string) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=12&language=${language}&page=1&api_key=${myKey}`);
        const data = await response.json();
        return data;
    }catch(error){
        return error;
    }
})