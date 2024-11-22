import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {createUser} from '../store/auth';
import {authActions} from '../store/auth';

import '../style/signup.css';

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

    return (
        <>
        <div className="text-white  height: h-screen text-left text-sm mt-10">
            <h1 className="text-center">Create a New Account</h1>
                <form onSubmit={handleOnSubmit} className="px-5 my-10 ">
                    <label htmlFor="name">Name: </label>
                    <input type='text' placeholder="Name" name="name" id="name" required/>
                    <label htmlFor="email">email: </label>
                    <input type='text' placeholder="email" name="email" id="email" required/>
                    <label htmlFor="email">Password: </label>
                    <input type="password" name="password" id="password" required/>
                    <button className="block bg-teal-600 p-2 rounded-md hover:bg-teal-400 hover:text-black hover:shadow hover:shadow-md hover:transform hover:-translate-y-1 transition-all duration-300 ease active:shadow-none active:transform active:translate-y-0">Create Account</button>
                    {error && <label className="text-red-500 text-xs mt-5">{error}</label>}
                    {message && <label className="text-orange-300 text-xs mt-3">{message}</label>}
                </form>
        </div>
        
        </>
    );
};

export default SignUp;