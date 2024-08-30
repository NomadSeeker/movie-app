import React from 'react';
import { Link } from 'react-router-dom';

import '../style/movieStyle.css';

const MovieList = ({movies, title}) => {

    return (
        <div>
            <div className='text-center my-4'>
                <h1 className='uppercase tracking-widest font-mono text-3xl'>{title}</h1>
            </div>
           
                <div className={`grid grid-rows-${movies.length} grid-cols-1 sm:grid-cols-2 md:grid-cols-4 `} >

                    {movies.map((movie, index) => (
                        <div key={movie._id} className='container my-2'>
                     
                            <Link to={`/movie/${movie._id}`}>
      
                                <img style={{width: '130px', height: '180px'}} className='mx-auto my-5 transition ease-in-out  hover:-translate-y-3 hover:scale-110 duration-300'  src={movie.poster_path} alt='movie poster' />
                                {movie.title}

                            </Link>
                            
                       
                        </div>
                    ))}

                    
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