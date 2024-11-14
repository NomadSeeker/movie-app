import {createSlice} from '@reduxjs/toolkit';

import {getMoviesByUser, dbGetRequest, dbPostRequest} from '../http';

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
            const url = `movies/favoriteMovies/${userId}`;
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

export const addFavorite = ({title, poster_path, movieId, userId}) => {
    return async (dispatch) => {

        const saveFavorite = async () => {
            const url = 'movies/saveFavoriteMovie';
            const data = {title, poster_path, movieId, userId};
            const headers = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await dbPostRequest(url, data, headers);
            return response;
        }

        try {
            const responseData = await saveFavorite();
            console.log(responseData);
        }catch(err) {
            dispatch(favoritesActions.setError({error: err.message}));
        }
    }
}