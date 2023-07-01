import React, { useState } from 'react';

const LazyLoader = ({ url }) => {
    const [loading, setLoading] = useState(true);
    return (
        <>
            {loading && <div className=' animate-pulse h-96 w-full bg-emerald-400'></div>}
            <img onLoad={() => setLoading(false)} className='max-w-full mx-auto' src={url} alt="photo" />
        </>
    );
};

export default LazyLoader;