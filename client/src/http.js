import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiHost = process.env.REACT_APP_API_HOST;
const apiUrl = process.env.REACT_APP_API_URL;
// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://movies-app-brown-one.vercel.app';

export async function getNewReleasedMovies() {

    const response = await axios.get(`${apiUrl}/home`,
        {    
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        });

        return response;
        
}

export async function getMovieDetails(id) {

   
    const response = await axios.get(`${apiUrl}/movie/${id}`,
    {    
        
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    });

    return response.data;
}


// export async function getUserMovies(title) {
   
    
// }

export async function getSearchedMovie(title) {

    const response = await axios.get(`${apiUrl}/search`,
        {
            params: {
                query: title
            },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });
        console.log(response.data.contents.length);
        if(!response) {
            throw new Error('An error ocurred while fetching movies');
        }

        if(response.data.contents.length === 0) {
            throw new Error('No movies found');
        }

        return response.data;
};

export const saveUser = async (userData) => {

    const response = await axios.post(`${baseUrl}/api/users/signup`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    
    return response;

};

export const getUserDB = async (userId) => {
    const response = await axios.get(`${baseUrl}/api/users/getAccount/${userId}`);

    if(response.status !== 200) {
        throw new Error('An error ocurred');
    }

    return response.data;
};

export const getMoviesByUser = async (userId) => {
    console.log(userId);
    const response = await axios.get(`${baseUrl}/api/movies/favoriteMovies/${userId}`);
   
    if(response.status !== 200)
        throw new Error();

    return response;
};

export const dbGetRequest = async (url, data = null, headers = {}) => {

    const response = await axios.get(`${baseUrl}/api/${url}`, data, headers);
    if(response.status !== 200 || !response)
        throw new Error('An error ocurred while resquesting the data');

    return response.data;
   
};

export const dbPostRequest = async (url, data=null, headers) => {

    const response = await axios.post(`${baseUrl}/api/${url}`, data, headers);

    if(response.status !== 200 || !response)
        throw new Error('An error ocurred while posting the data');


    return response.data;
}