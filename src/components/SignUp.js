import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {createUser} from '../store/auth';
import {authActions} from '../store/auth';

const SignUp = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const error = useSelector(state => state.auth.error);
    const message = useSelector(state => state.auth.message);
    const isLoading = useSelector(state => state.auth.loading);

    const handleOnSubmit= async (e) => {
        e.preventDefault();
        dispatch(authActions.setIsLoading());

        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
  
        await dispatch(createUser(userData));

        dispatch(authActions.setIsLoading());
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    if(user)
        return <p>User already has an account</p>

    return (
        <>
        <h1>Create a New Account</h1>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="name">Name: </label>
                <input type='text' placeholder="Name" name="name" id="name"/>
                <label htmlFor="email">email: </label>
                <input type='text' placeholder="email" name="email" id="email"/>
                <label htmlFor="email">Password: </label>
                <input type="password" name="password" id="password"/>
                <button>Create Account</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </>
    );
};

export default SignUp;