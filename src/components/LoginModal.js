import {useDispatch, useSelector} from 'react-redux';
import {Link, redirect, useNavigate}  from 'react-router-dom';

import {loginUser} from '../store/auth';

function LoginModal({loginRef, onCloseLogin}) {
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
            <dialog id="login" ref={loginRef}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>
                            <label htmlFor='email'>User name: </label>
                            <input type='text' id='email' name='email' placeholder='email' />
                        </p>
                        <p>
                            <label htmlFor="password">Password: </label>
                            <input type='password' id='password' name='password' placeholder='password' />
                        </p>
                       
                    </div>
                    <div>
                        <button type='submit'>Log in</button>
                        <button onClick={onCloseLogin}>Close</button>
                    </div>
                   
                </form>
                <Link to='/SignUp'>Sign Up</Link>
            </dialog>
        </>
    );
};

export default LoginModal;