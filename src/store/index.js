import { configureStore } from "@reduxjs/toolkit";

import  moviesReducer  from "./movies";
import authReducer from './auth';
import favoritesReducer from './favorites';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        auth: authReducer,
        favorites: favoritesReducer
    }
});


export default store;