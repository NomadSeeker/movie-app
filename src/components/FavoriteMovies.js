import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';    

import {getFavoriteMovies} from '../store/favorites';
import MovieList from './MovieList';

const FavoriteMovies = () => {
    const dispatch = useDispatch();
    const {favoriteMovies, error, message, loading} = useSelector(state => state.favorites);
    const {user} = useSelector(state => state.auth);
 
    useEffect(() => {
        dispatch(getFavoriteMovies(user.id));
    }, [dispatch]);

    if(favoriteMovies.length === 0)
        return <p>No favorite Movies found.</p>

    return (
        <>
            <MovieList movies={favoriteMovies} title={'Favorite Movies'} />
        </>
    );

}



export default FavoriteMovies;