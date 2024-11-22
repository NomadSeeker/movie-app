import {createSlice} from '@reduxjs/toolkit';

import {saveUser, getUserDB, dbPostRequest} from '../http';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        name: '',
        email: '',
        password: '',
        isLoggedIn: false,
        message: '',
        error: '',
        loading: false,
        id: ''
    },
    reducers: {
        setUsername(state, action) {

        },

        setIsLoggedIn(state, action) {
            state.isLoggedIn = !state.isLoggedIn;
        },

        setAccount(state, action) {
            const {name, email, password} = action.payload.user;

            state.name = name;
            state.email = email;
            state.password = password;
        },

        setMessage(state, action) {
            state.message = action.payload.message;
        },

        setError(state, action) {
            state.error = action.payload.error;
        },

        setIsLoading(state) {
            state.loading = !state.loading
        },
         
        setId(state, action) {
            state.id = action.payload.id;
        }, 
        
        setUser(state, action) {
            state.user = action.payload.user;
        }
    }
    
});

export const createUser = (userData) => {
    return async (dispatch) => {
        dispatch(authActions.setMessage({message: ''}));
        dispatch(authActions.setError({error: ''}));

        const sendData = async() => {
            const response = await saveUser(userData);
            if(response.status !== 200) {
                throw new Error('failed to create user');
            }

            return response.data;
        }

        try{ 
           const data = await sendData();
           dispatch(authActions.setUser({user: data.user}));
            dispatch(authActions.setMessage({message: data?.message} || 'Account created.'));
        }catch(err) {
            dispatch(authActions.setError({error: err.response?.data?.message}));
        }
    }   
};

export const getUserById = (userId) => {
   return async (dispatch) => {

        const getUser = async () => {
            const data = await getUserDB(userId);

            return data;
        };

        try {
            const userData = await getUser();
            dispatch(authActions.setAccount({user: userData.user || {}}));
        }catch(err) {
            dispatch(authActions.setError({error: err.response?.data?.message}));
        }
    }
};

export const loginUser  = (userData) => {
    const url = 'users/login';

   return async (dispatch) => {
        dispatch(authActions.setIsLoading());

        const login = async () => {
            const data = await dbPostRequest(url, userData);

            return data;
        }

        try {
           const user = await login();
           dispatch(authActions.setUser({user: user.user}));
           dispatch(authActions.setMessage({message: user.message}));
           dispatch(authActions.setIsLoggedIn());
        }catch(err) {
            dispatch(authActions.setError({error: err.message}));
        }
        
        dispatch(authActions.setIsLoading());
    }
};

export const authActions = authSlice.actions;

export default authSlice.reducer;