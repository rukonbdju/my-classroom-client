import React, { useEffect, useState } from 'react';

const usePostMethod = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
        const handleFetching = async (url, formData) => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                setData(result)
            } catch {
                (err) => setError(err)
            }
            finally {
                setLoading(false)
            }
        }

    return { data, loading, error,handleFetching };
};

export default usePostMethod;