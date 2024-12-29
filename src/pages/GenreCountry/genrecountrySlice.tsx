import { createSlice } from "@reduxjs/toolkit"
import { setGenrecountry } from "./actionGenreCountry";

export interface genreCountryType {
    page: number,
    results: [],
    total_pages: number,
    total_results: number,
    iso_639_1: string,
    id: string,
    name: string
}

export interface genreCountryState{
    genrecountry: genreCountryType
}

const initialState = {
    genrecountry: {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 1,
        iso_639_1: '',
        id: '',
        name: ''
    }
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setGenrecountry.fulfilled, (state = initialState, action) => {
                state.genrecountry = action.payload
            })
    }
});

export default homeSlice.reducer;