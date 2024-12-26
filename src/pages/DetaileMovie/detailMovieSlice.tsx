import { createSlice } from "@reduxjs/toolkit"
import { setCast, setDetailmovie, setSimilar } from "./actionDetailmovie"

export interface detailmovieType{
    id: number,
    name: string,
    backdrop_path: string,
    overview: string,
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: number,
    genres: []
}

export interface SimilarType{
    page: number,
    results: [],
    total_pages: number,
    total_results: number,
    id: number,
    poster_path: string,
    title: string
}

export interface Cast {
    id: number,
    name: string
    profile_path: string
}

export interface detailmovieState{
    detailmovie: detailmovieType,
    similar: SimilarType[],
    cast: Cast[]
}

const initialState: detailmovieState = {
    detailmovie: {
        id: 0,
        name: '',
        backdrop_path: '',
        overview: '',
        poster_path: '',
        title: '',
        release_date: '',
        vote_average: 0,
        genres: []
    },
    similar: [],
    cast: []
}

const detailSlice = createSlice({
    name: 'detailmovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setDetailmovie.fulfilled, (state = initialState, action) => {
                state.detailmovie = action.payload
            })
            .addCase(setSimilar.fulfilled, (state = initialState, action) => {
                state.similar = action.payload.results
            })
            .addCase(setCast.fulfilled, (state = initialState, action) => {
                state.cast = action.payload.cast
            })
    }
})

export default detailSlice.reducer;