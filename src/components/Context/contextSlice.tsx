import { createSlice } from "@reduxjs/toolkit"
import { setLanguage } from "./actionContext"

export interface languageType {
    name: string;
    english_name: string;
    iso_639_1: string
}

interface languageState {
    language: languageType[]
}

const initialState: languageState = {
    language: []
}

const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLanguage.fulfilled, (state = initialState, action) => {
                state.language = action.payload;
            })
    }
})

export default contextSlice.reducer;