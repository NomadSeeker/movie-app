import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Youtube from 'react-youtube';
import {useParams} from 'react-router-dom';

import {getMovieDetail} from '../store/movies';




const MovieDetails = () => {
    const movie = useSelector(state => state.movies.movieDetail);
    const loading = useSelector(state => state.movies.loading);
    const error = useSelector(state => state.movies.error);
    const dispatch = useDispatch();
    const {id} = useParams();

    const ops = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0
        }
    };

    useEffect(() => {
       dispatch(getMovieDetail(id));
    }, [dispatch]);

    if(loading)
        return <p>Loading..</p>

    if(error)
        return <p>{error}</p>
    
    return (
       
        <>
            <div>
                <h2>{movie.title}</h2>
                <img style={{width: '350px', height: '500px'}} src={movie.poster_path} alt='movie poster' />
                <p>Released year: {movie.release_date}</p>
                <p>Description: {movie.overview}</p>
                <p>Rating: {movie.vote_average}</p>
                <span>+ Add to Favorites</span>
                <ul>
                    <span>Genres: </span>
                    {movie.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                    
                </ul>
                {
                    movie.youtube_trailer && 
                    <div>
                        <p>Watch Trailer: </p>
                        <Youtube videoId={movie.youtube_trailer.split('v=')[1]} opts={ops} /> 
                    </div>
                }
                <ul>
                    <span>Available at: </span>
                    {movie.sources.map((source, index) => (
                        <li key={index}>
                            <a href={source.link} target="_blank" rel="noopener noreferrer">{source.source}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

}

export default MovieDetails;
