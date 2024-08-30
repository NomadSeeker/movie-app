import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import MovieList from './MovieList';
import { getNewMoviesData } from '../store/movies';




const Home = () => {
    const dispatch = useDispatch();
    let movies = useSelector(state => state.movies.movies);
    let error = useSelector(state => state.movies.error);
    let loading = useSelector(state => state.movies.loading);

    useEffect(() => {
        dispatch(getNewMoviesData());
    }, [dispatch]);

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>{error}</p>
    }
   

    return (
        <>
            {movies.length > 0 && <MovieList movies={movies} title={'New Releases'} />}
        </>
    )

};

export default Home;