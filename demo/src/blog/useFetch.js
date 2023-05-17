import { useEffect, useState } from 'react';

const useFetch = (URL) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        setIsPending(true);
        fetch(URL, { signal: abortController.signal })
            .then(res => {
                // handling if we cant fetch data from endpoint
                if (!res.ok) {
                    throw Error('Could not fetch data from resource');
                }
                return res.json();
            })
            .then(newData => {
                setData(newData);
                
                setError(null);
                // set loading message to false
                setIsPending(false);
            })
            // handling exceptions
            .catch((err) => {
                if (err === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            })
        return () => {
            abortController.abort();
        };
    }, [URL]); 
    
    return {data, isPending, error};
}

export default useFetch;