import { createSlice } from "@reduxjs/toolkit"
import { setDetailcast, setMoviecast } from "./actionDetailcast"

export interface detailcastType {
    id: number,
    name: string,
    profile_path: string,
    also_known_as: string,
    biography: string,
    gender: number,  
    birthday: string,
    known_for_department: string,
    place_of_birth: string
}

export interface movieCastType{
    profile_path: string,
    character: string,
    name: string,
    id: number,
    cast: [],
    popularity: number,
    poster_path: string,
    title: string
}

export interface detailcastState {
    detailcast: detailcastType,
    moviecast: movieCastType
}

const initialState: detailcastState = {
    detailcast: {
        id: 0,
        name: '',
        profile_path: '',
        also_known_as: '',
        biography: '',
        gender: 0,  
        birthday: '',
        known_for_department: '',
        place_of_birth: ''
    },
    moviecast: {
        profile_path: '',
        character: '',
        name: '',
        id: 0,
        cast: [],
        popularity: 0,
        poster_path: '',
        title: ''
    }
}

const detailcastSlice = createSlice({
    name: 'detailcast',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(setDetailcast.fulfilled, (state = initialState, action) => {
                state.detailcast = action.payload
            })
            .addCase(setMoviecast.fulfilled, (state = initialState, action) => {
                state.moviecast = action.payload
            })
    }
})

export default detailcastSlice.reducer;