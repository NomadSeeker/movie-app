import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Youtube from 'react-youtube';
import {useParams} from 'react-router-dom';

import {getMovieDetail} from '../store/movies';
import {addFavorite} from '../store/favorites';




const MovieDetails = () => {
    const movie = useSelector(state => state.movies.movieDetail);
    const loading = useSelector(state => state.movies.loading);
    const error = useSelector(state => state.movies.error);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const {id} = useParams();
    const wdth = window.innerWidth;
    let hght = '';
    let wth = '';

    if(wdth <= 390){
        wth = '330';
        hght = '250';
    }else if(wdth > 500 && wdth <= 768) {
        wth = '500';
        hght = '300';
    } else if(wdth <= 1400) {
        wth= '800';
        hght = '500';
    }

   
    const ops = {
        height: hght,
        width: wth,
        playerVars: {
            autoplay: 0
        }
    };

    useEffect(() => {
       dispatch(getMovieDetail(id));
    }, [dispatch, id]);

    const handleAddFavorite = () => {
       
        dispatch(addFavorite({title: movie.title, poster_path: movie.poster_path, movieId: movie.id, userId: user.id}));
    }

    if(loading)
        return <p>Loading..</p>

    if(error)
        return <p>{error}</p>
    
    return (
       
        <>
            <article>
                <div className='bg-slate-700 py-7 text-white text-left font-mono'>
                    <h2 className=' text-2xl mb-5 px-2'>{movie.title}</h2>
                    <img  src={movie.poster_path} alt='movie poster' />
                    <div className='text-sm mt-6 px-2 mb-5'>
                        <p>Released year: {movie.release_date}</p>
                        <p>Description: {movie.overview}</p>
                        <p>Rating: {movie.vote_average}</p>
                        <ul style={{display:'flex'}} className=''>
                            <span>Genres: </span>
                            {movie.genres.map((genre, index) => (
                                <li key={index}>{genre},</li>
                            ))}
                            
                        </ul>
                        <span className='mt-6 hover:text-teal-400' onClick={handleAddFavorite}>&#x2B50; Add to Favorites</span>
                    </div>
                   
                    {
                        movie.youtube_trailer && 
                        <div className='px-1 md:px-2 my-10'>
                            <p>Watch Trailer: </p>
                            <Youtube videoId={movie.youtube_trailer.split('v=')[1]} opts={ops} /> 
                        </div>
                    }
                    <div className='px-2 text-sm'>
                        <ul className='flex flex-wrap'>
                            <span>Streaming: </span>
                            {movie.sources.map((source, index) => (
                                <li key={index} className='hover:text-teal-300 visited:text-teal-300 px-1'>
                                    <a href={source.link} target="_blank" rel="noopener noreferrer">•{source.source} </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </article>
        </>
    );

}

export default MovieDetails;
