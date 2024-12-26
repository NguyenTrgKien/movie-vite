import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../pages/Home/homeSlice';
import detailMovie from '../pages/DetaileMovie/detailMovieSlice';
import watchmovie from '../pages/WatchMovie/watchmovieSlice';
import listGenre from '../pages/ListGenre/listgenreSlice';
import detailCast from '../pages/DetailCast/detailcastSlice';
import genreCountry from '../pages/GenreCountry/genrecountrySlice';
import contextSlice from '../components/Context/contextSlice';

const store = configureStore({
    reducer: {
        home: homeReducer,
        detailmovie: detailMovie,
        watchmovie: watchmovie,
        listgenre: listGenre,
        detailcast: detailCast,
        genrecountry: genreCountry,
        context: contextSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>; // lấy state toàn bộ của redux
export default store;
