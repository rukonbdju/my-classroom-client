import React, { useState } from 'react';

const useGetMethod = () => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleFetching = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const result = await response.json();
            setData(result)
        } catch {
            (err) => setError(err)
        }
        finally {
            setLoading(false)
        }
    }

    return { data, loading, error, handleFetching }
};

export default useGetMethod;