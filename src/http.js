import axios from 'axios';


export async function getNewReleasedMovies() {

    const response = await axios.get('https://movies-api14.p.rapidapi.com/home',
        {    
            headers: {
                'X-RapidAPI-Key': '595b990849msh5f80e0a3d5e9e7dp1684a9jsn81d2740d04d7',
                'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
            }
        });

        return response;
        
}

export async function getMovieDetails(id) {

   
    const response = await axios.get(`https://movies-api14.p.rapidapi.com/movie/${id}`,
    {    
        
        headers: {
            'X-RapidAPI-Key': '595b990849msh5f80e0a3d5e9e7dp1684a9jsn81d2740d04d7',
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
        }
    });

    return response.data;
}


// export async function getUserMovies(title) {
   
    
// }

export async function getSearchedMovie(title) {

    const response = await axios.get('https://movies-api14.p.rapidapi.com/search',
        {
            params: {
                query: title
            },
            headers: {
                'x-rapidapi-key': '595b990849msh5f80e0a3d5e9e7dp1684a9jsn81d2740d04d7',
                'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
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

    const response = await axios.post('http://localhost:5000/api/users/signup', userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    
    return response;

};

export const getUserDB = async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/users/getAccount/${userId}`);

    if(response.status !== 200) {
        throw new Error('An error ocurred');
    }

    return response.data;
};

export const getMoviesByUser = async (userId) => {
    console.log(userId);
    const response = await axios.get(`http://localhost:5000/api/movies/favoriteMovies/${userId}`);
   
    if(response.status !== 200)
        throw new Error();

    return response;
};

export const dbGetRequest = async (url, data = null, headers = {}) => {

    const response = await axios.get('http://localhost:5000/api/'+url, data, headers);
    if(response.status !== 200 || !response)
        throw new Error('An error ocurred while resquesting the data');

    return response.data;
   
};

export const dbPostRequest = async (url, data=null, headers) => {

    const response = await axios.post(`http://localhost:5000/api/${url}`, data, headers);

    if(response.status !== 200 || !response)
        throw new Error('An error ocurred while posting the data');

    console.log(response);
    return response.data;
}