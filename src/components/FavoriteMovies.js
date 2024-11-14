import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';    
import {Link} from 'react-router-dom';

import {getFavoriteMovies} from '../store/favorites';
import '../style/favorites.css';


const FavoriteMovies = () => {
    const dispatch = useDispatch();
    const {favoriteMovies, error, message, loading} = useSelector(state => state.favorites);
    const {user} = useSelector(state => state.auth);
 
    useEffect(() => {
        dispatch(getFavoriteMovies(user.id));
    }, [dispatch, user.id]);

    if(favoriteMovies.length === 0)
        return <p>No favorite Movies found.</p>

    return (
        <>
            <section className='h-screen mt-20 text-white favorites-container'>
                {favoriteMovies.length > 0 && (
                    favoriteMovies.map(movie => (
                        <div key={movie.movieId}>
                            <Link to={`/movie/${movie.movieId}`}>
                                <img src={movie.poster_path} alt='movie poster'/>
                                <h2>{movie.title}</h2>
                            </Link>
                        </div>
                    ))
                )}
                {/* <MovieList movies={favoriteMovies} title={'Favorite Movies'} /> */}
            </section>
            
        </>
    );

}



export default FavoriteMovies;