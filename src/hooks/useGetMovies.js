import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';


export function useGetMovies(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        
        const fetchData = async () => {
            setIsFetching(true);
            try{
               const response = await fetchFn();
               setFetchedData(JSON.stringify(response));
            }catch(error){
               setError({message: error.message || 'Error fetching data.'});
            }
            setIsFetching(false);
    };
    fetchData();

    }, [fetchFn]);

    return {
        isFetching,
        error,
        fetchedData
    };
}