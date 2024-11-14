import React from 'react';
import { Link } from 'react-router-dom';

import Carousel from './Carousel';

import '../style/movieStyle.css';

const MovieList = ({movies, title}) => {

    return (
        <div className='my-14'>
            <div className='text-left my-2'>
                <h1 className='lg:tracking-widest font-mono text-l md:text-2xl text-white text-nowrap ml-5'>{title}</h1>
            </div>

            <div className='carousl'>
                <Carousel movies={movies}/>
            </div>
            
           
                
           
        </div>
    );
};

export default MovieList;


// <div key={movie._id} className='container'>
// <h4>{movie.title}</h4>
// <Link to={`/movie/${movie._id}`}>
//     <img style={{width: '200px', height: '300px'}} src={movie.poster_path} alt='movie poster' />
//     <p>Ver más</p>
// </Link>
// </div>