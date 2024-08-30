import React, {useRef, useState}from 'react';
import {useSelector} from 'react-redux';
import {Link, redirect, useNavigate}  from 'react-router-dom';

import LoginModal from './LoginModal';
import SignUp from './SignUp';

export default function Header() {
    const navigate = useNavigate();
    const {user, isLoggedIn} = useSelector(state => state.auth);
    let inputRef = useRef('');
    let loginRef = useRef(null);
    // const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const [showLogin, setShowLogin] = useState(false);
    console.log(isLoggedIn);

    function searchMovie(e) {
        e.preventDefault();
        const query = inputRef.current.value;

        navigate(`/findMovie/${query}`);
        
    }

    function handleLogin() {
        // setShowLogin(!showLogin);
        loginRef.current.showModal();
    }

    function handleCloseLogin() {
        loginRef.current.close();
    }


    return (
        <>
        
        <header >
            <div className='grid grid-cols-1 space-y-3 md:grid-cols-3 md:space-y-1'>
                <div>
                    <h1>Movie App or Logo</h1>
                </div>
                <div>
                <form onSubmit={searchMovie}>
                                <input className='border border-gray-500 rounded-md'
                                    ref={inputRef}
                                    type='text' 
                                    placeholder=' Search Movie...'
                                    name='searchMovie'
                                    id='searchMovie'
                                />
                                <button hidden type='submit'>Search</button>
                            </form>
                </div>
                <div>
                    <nav>
                           
                            <ul>
                                <div className='grid grid-cols-1 sm:grid-cols-4 space-y-1'>
                                <li>
                                    <Link to='/'>Home </Link>
                                </li>
                                <li>
                                    <Link to='/myFavorites'>My List</Link>
                                </li>
                                {
                                    isLoggedIn ? <li>Log out</li> : (<li>
                                        <button onClick={handleLogin}>Log in</button>
                                        </li>)
                                } 
                                {/* <li>
                                    <Link to='SignUp' >Sign Up</Link>
                                </li> */}
                             
                                <li>
                                    <Link to='myProfile'>
                                        Profile
                                    </Link>
                                    
                                </li>
                                </div>
                               
                                
                            </ul>
                        </nav>
                </div>
                    
                </div>
            </header>
       
             
            
            <LoginModal loginRef={loginRef} onCloseLogin={handleCloseLogin}/>
        </>
    );
}