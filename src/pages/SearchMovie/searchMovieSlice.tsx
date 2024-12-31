import { createSlice } from "@reduxjs/toolkit"
import { setSearchMovie } from "./actionSearchMovie";

export interface searchType {
    page: number,
    results: [],
    total_pages: number,
    total_results: number,
    id: number,
    name: string
}

export interface searchState {
    search: searchType
}

const initialState: searchState = {
    search: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        id: 0,
        name: ''
    }
}

const searchMovieSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(setSearchMovie.fulfilled, (state, action) => {
                state.search = action.payload;
            });
    }
})

export default searchMovieSlice.reducer;