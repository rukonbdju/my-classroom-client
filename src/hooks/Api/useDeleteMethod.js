import React from 'react';

const useDeleteMethod = () => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleFetching = async (url, data) => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
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

    return { data, loading, error, handleFetching }
};

export default useDeleteMethod;