import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {findMovie} from '../store/movies';
import MovieList from './MovieList';


export default function FindMovie() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const error = useSelector(state => state.movies.error);
    const loading = useSelector(state => state.movies.loading);
    const {title} = useParams();

    useEffect(() => {
        dispatch(findMovie(title));
    }, [dispatch, title]);


    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>{error}</p>
    }   
    
    if(movies.length <= 0) {
        return <p>No movies were found with {title}</p>
    }
    
    return (
        <>
        <section className='flex flex-col  h-fit mt-10 text-white'>
            <MovieList movies={movies} title={`Search Results for "${title}":`} />
        </section>
            
        </>

    )

};

// {
//     movies.length > 0 ? (
//         <MovieList movies={movies} title={'Search Results'} />
//     ) : <p>No movies found with that name.</p>
// }  