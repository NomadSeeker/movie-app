import {createSlice} from '@reduxjs/toolkit';

import {getNewReleasedMovies, getMovieDetails, getSearchedMovie, getMoviesByUser} from '../http';


const moviesSlice = createSlice({

    name: 'movies',
    initialState: {
        movies: [],
        loading: false,
        error: '',
        movieDetail: {
            id: '',
            title: '',
            release_date: '',
            overview: '',
            vote_average: '',
            genres: [],
            youtube_trailer: '',
            poster_path: '',
            sources: []
        }
    },
    reducers: {

        setMovies(state,action) {
            state.movies = action.payload.movies;
        },

        setError(state, action) {
            state.error = action.payload.error;
        },

        setIsLoading(state) {
            state.loading = !state.loading;
        },

        setMovieDetail(state, action) {
            state.movieDetail.id = action.payload._id;
            state.movieDetail.title = action.payload.title;
            state.movieDetail.release_date = action.payload.release_date;
            state.movieDetail.overview = action.payload.overview;
            state.movieDetail.vote_average = action.payload.vote_average;
            state.movieDetail.genres = action.payload.genres;
            state.movieDetail.youtube_trailer = action.payload.youtube_trailer;
            state.movieDetail.poster_path = action.payload.poster_path;
            state.movieDetail.sources = action.payload.sources;
        },

        foundMovies(state, action) {
            state.movies = action.payload;
        }

    }

});

export function getNewMoviesData() {
    return async (dispatch) => {

        dispatch(moviesActions.setIsLoading());

        const getData = async () => {
         
            const response = await getNewReleasedMovies();

            if(response.status !== 200){
                throw new Error('Failed to fetch movies.');
            }

            return response.data;
        }

        try{

            const movieData = await getData();
            dispatch(moviesActions.setMovies({movies: movieData[1].movies || []}));

        }catch(error) {

            dispatch(moviesActions.setError({error: 'Error fetching new Released movies'}));
        }

        dispatch(moviesActions.setIsLoading());
    }
};

export function getMovieDetail(id) {
    return async (dispatch) => {

        dispatch(moviesActions.setIsLoading());

        const getData = async () => {
 
            const response = await getMovieDetails(id);

            if(!response){
                throw new Error('Failed to fetch movie details.');
            }

            return response.movie;
        }

        try{
            const movieData = await getData();
            dispatch(moviesActions.setMovieDetail(movieData));
        }catch(error) {
            dispatch(moviesActions.setError({error: `Error fetching movie details. Error: ${error.message}`}))
        }

        dispatch(moviesActions.setIsLoading());
    }
};

export function findMovie(title) {
    return async (dispatch) => {
        dispatch(moviesActions.setIsLoading());

        const getData = async () => {
            const response = await getSearchedMovie(title);
            // if(response.status !== 200){
            //     throw new Error(response.error);
            // }
        
            return response.contents;
        }

        try{
            const foundMovies = await getData();
            dispatch(moviesActions.foundMovies(foundMovies || []));
        }catch(error){
            dispatch(moviesActions.setError({error: error.message || 'Error ocurred finding movie'}));
        }

        dispatch(moviesActions.setIsLoading());
    }
};


export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;

/*
Falta el reducer de agregar la lista de resultados de la busqueda
falta llamar el action en FindMovie y desplegar los resultados
*/