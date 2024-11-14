import React, {useRef, useState}from 'react';
import {useSelector} from 'react-redux';
import {Link, redirect, useNavigate}  from 'react-router-dom';

import LoginModal from './LoginModal';
import SignUp from './SignUp';
import '../style/header.css';

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
        inputRef.current.value = '';
        navigate(`/findMovie/${query}`);
        
    }

    function handleLogin() {
        // setShowLogin(!showLogin);
        loginRef.current.showModal();
    }

    function handleCloseLogin() {
        loginRef.current.close();
    }

    function handleSignUp() {
        loginRef.current.close();
        navigate('/SignUp');
    }


    return (
        <>
        
        <header >
            <div className='flex flex-col justify-center md:flex-row md:justify-between md:items-baseline md:space-y-1 text-white items-center py-2 w-full bg-neutral-800' >
                <div>
                    <h1 className='pb-2 md:px-1.5'>
                        <Link to='/'>Movie App</Link>
                    </h1>
                </div>
                <div className='pb-2'>
                <form onSubmit={searchMovie}>
                                <input className='border border-gray-500 rounded-md w-80 h-10 text-black'
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
                           
                            <ul >
                                <div className='flex flex-col md:flex-row nav-items'>
                                <li className='hover:text-teal-400'>
                                    <Link to='/'>Home </Link>
                                </li >
                                {isLoggedIn && <li className='hover:text-teal-400'>
                                    <Link to='/myFavorites'>My List</Link>
                                </li>}
                                {
                                    isLoggedIn ? (
                                            <>
                                                <li className='hover:text-teal-400'>Log out</li> 
                                                <li className='hover:text-teal-400'>
                                                <Link to='myProfile'>
                                                    Profile
                                                </Link>
                                                </li>
                                            </>
   
                                        ): (<li className='hover:text-teal-400'>
                                        <button onClick={handleLogin}>Log in</button>
                                        </li>)
                                } 
                                {/* <li>
                                    <Link to='SignUp' >Sign Up</Link>
                                </li> */}
                             
                                
                                </div>
                               
                                
                            </ul>
                        </nav>
                </div>
                    
                </div>
            </header>
       
             
            
            <LoginModal loginRef={loginRef} onCloseLogin={handleCloseLogin} onSignUp={handleSignUp}/>
        </>
    );
}