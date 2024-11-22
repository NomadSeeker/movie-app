import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import MovieList from './MovieList';
import { getNewMoviesData } from '../store/movies';


import '../style/home.css';
import HeroCarousel from './HeroCarousel';




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

    if(movies.length <= 0) {
        return <p>No movies were found.</p>
    }
   

    return (
        <>
            <section>
                {movies.length > 0 && (<HeroCarousel movies={movies[0].movies}/>)} 
            </section>
            <section>
                
                {movies.length > 0 && (
                        movies.map(collection => <MovieList movies={collection.movies} title={collection.title} />)
                    )
                }
            </section>
            
        </>
    )

};

export default Home;