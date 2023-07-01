import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Classroom from '../Classroom/Classroom';
import Placeholder from '../Shared/Placeholder';

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
            } catch(error) {
                console.log(error)
            }
        }
        const url = `http://localhost:3000/api/v1/classrooms/${id}`
        getClassroom(url)
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
                <Placeholder></Placeholder>
            </div>
        )
    }

    return (
        <Classroom classroom={classroom}></Classroom>
    );
};

export default JoinedClassrooms;