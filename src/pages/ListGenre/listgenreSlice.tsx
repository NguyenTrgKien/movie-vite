import { createSlice } from "@reduxjs/toolkit"
import { setListgenre } from "./actionListGenre"

export interface listGenreType{
    page: number,
    results: [],
    total_pages: number,
    total_results: number,
    id: number,
    name: string
}

export interface listGenreState{
    listgenre: listGenreType
}

const initialState: listGenreState = {
    listgenre: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
        id: 0,
        name: ''
    }
}

const listgenreSlice = createSlice({
    name: 'listgenre',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(setListgenre.fulfilled, (state = initialState, action) => {
                state.listgenre = action.payload
            })
    }
})

export default listgenreSlice.reducer;