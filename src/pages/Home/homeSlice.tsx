import { createSlice } from "@reduxjs/toolkit";
import { setAdventure, setAnimation, setGenre, setNewmovie, setPopular, setToprated, setTrending, setUpcoming } from "./actionHome";
import { listGenreType } from "../ListGenre/listgenreSlice";

export interface homeType {
    id: number;
    name: string;
    backdrop_path: string;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    first_air_date: string;
    results: [];
}

export interface homeState{
    popular: [],
    genre: [],
    trending: [],
    upcoming: [],
    toprated: [],
    animation: [],
    newmovie: listGenreType,
    adventure: []
}

const initialState: homeState = {
    popular: [],
    genre: [],
    trending: [],
    upcoming: [],
    toprated: [],
    animation: [],
    newmovie: {
      page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        id: 0,
        name: ''
    },
    adventure: []
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setPopular.fulfilled, (state, action) => {
                state.popular = action.payload.results;
            })
            .addCase(setGenre.fulfilled, (state, action) => {
                state.genre = action.payload.genres;
              })
        
              // Trending movies
              .addCase(setTrending.fulfilled, (state, action) => {
                state.trending = action.payload.results;
              })
        
              // Upcoming movies
              .addCase(setUpcoming.fulfilled, (state, action) => {
                state.upcoming = action.payload.results;
              })
        
              // Top Rated movies
              .addCase(setToprated.fulfilled, (state, action) => {
                state.toprated = action.payload.results;
              })
        
              // Animation movies
              .addCase(setAnimation.fulfilled, (state, action) => {
                state.animation = action.payload.results;
              })

              .addCase(setNewmovie.fulfilled, (state, action) => {
                state.newmovie = action.payload;
              })
              .addCase(setAdventure.fulfilled, (state, action) => {
                state.adventure = action.payload.results;
              })
    }
})

export default homeSlice.reducer;