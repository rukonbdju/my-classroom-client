import React from 'react';

const Classroom = ({classroom}) => {
    return (
        <div className=' bg-slate-200 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-300 text-center'>
            <h1 className="text-5xl">{classroom.name}</h1>
        </div>
    );
};

export default Classroom;