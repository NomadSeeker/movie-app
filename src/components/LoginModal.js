import {useDispatch, useSelector} from 'react-redux';
import {Link, redirect, useNavigate}  from 'react-router-dom';

import {loginUser} from '../store/auth';
import '../style/header.css';

function LoginModal({loginRef, onCloseLogin, onSignUp}) {
    const dispatch = useDispatch();

    async function  handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        await dispatch(loginUser(userData));

        onCloseLogin();
    }

    return(
        <>
            <dialog id="login" ref={loginRef} className='backdrop-blur-2xl bg-slate-800/30 p-12'>
                <form onSubmit={handleSubmit} className='mb-5'>
                    <div className='flex flex-col text-left'>
                      
                            <label htmlFor='email'>User name: </label>
                            <input type='text' id='email' name='email' placeholder='email' required/>
                       
                       
                            <label htmlFor="password">Password: </label>
                            <input type='password' id='password' name='password' placeholder='password' required/>
                     
                       
                    </div>
                    <div className='flex justify-between'>
                        <button type='submit' className='submit'>Log in</button>
                        <button className='cancel' onClick={onCloseLogin}>Close</button>
                    </div>
                   
                </form>
                <input className='text-white' type='button' value='Sign up' onClick={onSignUp} />
            </dialog>
        </>
    );
};

export default LoginModal;