import React, { useState } from 'react';

const LazyLoader = ({ url }) => {
    const [loading, setLoading] = useState(true);
    return (
        <>
            {loading && <div className=' animate-pulse h-64 w-full bg-indigo-700'></div>}
            <img onLoad={() => setLoading(false)} className='w-full' src={url} alt="photo" />
        </>
    );
};

export default LazyLoader;