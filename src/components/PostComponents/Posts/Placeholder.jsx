import React from 'react';

const Placeholder = () => {
    return (
        <div className=' animate-pulse p-2 my-2 bg-slate-100 border rounded'>
            <div className='flex flex-row gap-2 items-center'>
                <div className='w-12 h-12 rounded-full bg-slate-500 m-1'></div>
                <div className='h-4 w-1/5 rounded-full bg-slate-500 m-1'></div>
            </div>
            <div className='my-4'>
                <p className='h-2 rounded-full w-3/4 bg-slate-700 m-1'></p>
                <p className='h-2 rounded-full w-1/2 bg-slate-700 m-1'></p>
            </div>
            <div className='flex flex-row gap-2'>
                <div className='bg-slate-500 h-6 basis-1/3 rounded'></div>
                <div className='bg-slate-500 h-6 basis-1/3 rounded'></div>
                <div className='bg-slate-500 h-6 basis-1/3 rounded'></div>
            </div>
        </div>
    );
};

export default Placeholder;