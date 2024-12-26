import { createSlice } from "@reduxjs/toolkit"
import { setTrailer } from "./actionWatchmovie"

export interface TrailerType{
    id: number,
    site: string,
    type: string,
    key: string,
    title: string
}

export interface watchmovieState{
    trailer: TrailerType
}

const initialState:watchmovieState = {
    trailer: {
        id: 0,
        site: '',
        type: '',
        key: '',
        title: ''
    }
}

const watchmovieSlice = createSlice({
    name: 'watchmovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setTrailer.fulfilled, (state = initialState, action) => {
                state.trailer = action.payload.results.find((it: TrailerType) => it.site === "YouTube" && it.type === "Trailer")
            })
    }
})

export default watchmovieSlice.reducer;