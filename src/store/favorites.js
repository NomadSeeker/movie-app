import {createSlice} from '@reduxjs/toolkit';

import {getMoviesByUser, dbGetRequest} from '../http';

const favoritesSlice = createSlice({
    name: 'whishlist',
    initialState: {
        title: '',
        id: '',
        release_date: '',
        genre: [],
        poster_path: '',
        favoriteMovies: [],
        error: '',
        loading: false,
        userId: ''
    },
    reducers: {
        setFavoriteMovies(state, action) {
            const {favoriteMovies} = action.payload;
            state.favoriteMovies = favoriteMovies;
        }, 
        setError(state, action) {
            state.error = action.payload.error;
        }
    }
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const getFavoriteMovies = (userId) => {
    return async (dispatch) => {

        const getMovies = async () => {
            const url = `movies/favoriteMovies/66bc0557812ddaeccd235719`;
            const data = await dbGetRequest(url);
            return data.movies;
        }


        try {
            const favorites = await getMovies();
            console.log(favorites);
            dispatch(favoritesActions.setFavoriteMovies({favoriteMovies: favorites}));
        }catch(err) {
            dispatch(favoritesActions.setError({error: err.message})); 
        }
       
    }
};