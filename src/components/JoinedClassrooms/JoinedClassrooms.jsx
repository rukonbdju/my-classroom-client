import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Classroom from '../Classroom/Classroom';

const JoinedClassrooms = ({ id }) => {
    const [classroom, setClassroom] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getClassroom = async (url) => {
            try {
                setLoading(true)
                const result = await handleGetMethod(url);
                setClassroom(result)
                setLoading(false)
            } catch {
                err => console.log(err)
            }
        }
        const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/${id}`
        getClassroom(url)
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
                <div className="w-80 h-48 rounded-md bg-slate-300"></div>
                <div className="w-80 h-48 rounded-md bg-slate-300"></div>
                <div className="w-80 h-48 rounded-md bg-slate-300"></div>
            </div>
        )
    }

    return (
        <Classroom classroom={classroom}></Classroom>
    );
};

export default JoinedClassrooms;