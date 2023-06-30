import React from 'react';

const Placeholder = () => {
    return (
        <div className=" animate-pulse bg-cover w-3/4 mt-24 mx-auto">
            <div className="rounded-md bg-slate-200 p-4">
                <div className="h-4 w-64 rounded-md bg-slate-600"></div>
                <div className="h-4 w-48 rounded-md mt-4 bg-slate-600"></div>
                <div className="mt-8">
                    <div className="h-2 rounded-full mb-2-4 bg-slate-600"></div>
                    <div className="h-2 rounded-full w-64 my-4 bg-slate-600"></div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 my-4">
                <div>
                    <div className="w-12 h-12 rounded-full bg-slate-500"></div>
                </div>
                <div className="h-12 w-full rounded-full bg-slate-500"></div>
            </div>
            <div className='p-2 my-2 bg-slate-100 border rounded'>
                <div className='flex flex-row gap-2 items-center'>
                    <div className='w-12 h-12 rounded-full bg-slate-700 m-1'></div>
                    <div className='h-4 w-1/5 rounded-full bg-slate-700 m-1'></div>
                </div>
                <div className='my-4'>
                    <p className='h-2 rounded-full w-3/4 bg-stone-700 m-1'></p>
                    <p className='h-2 rounded-full w-1/2 bg-stone-700 m-1'></p>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='bg-slate-700 h-6 basis-1/3 rounded'></div>
                    <div className='bg-slate-700 h-6 basis-1/3 rounded'></div>
                    <div className='bg-slate-700 h-6 basis-1/3 rounded'></div>
                </div>
            </div>
        </div>
    );
};

export default Placeholder;