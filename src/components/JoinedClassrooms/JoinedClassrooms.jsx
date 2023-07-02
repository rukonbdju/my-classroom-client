import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Classroom from '../Classroom/Classroom';
import Placeholder from '../Shared/Placeholder';
import useAuth from '../../hooks/Auth/useAuth';
import GetClassroom from './GetClassroom';
import { Link } from 'react-router-dom';

const JoinedClassrooms = () => {
    const { user } = useAuth();
    const [enrolledClassrooms, setEnrolledClassrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(enrolledClassrooms)
    //get enrolled classrooms
    useEffect(() => {
        const getEnrolledClassrooms = async (url) => {
            try {
                setLoading(true);
                const result = await handleGetMethod(url);
                if (result?.joined) {
                    setEnrolledClassrooms(result.joined);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        const enrollUrl = `https://my-classroom-server.onrender.com/api/v1/users/${user.uid}`;
        getEnrolledClassrooms(enrollUrl);
    }, []);

    return (
        <div>
            <h3 className="text-2xl pb-2 border-b border-indigo-700">
                Enrolled Classroom
            </h3>
            {loading ? <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
                <Placeholder></Placeholder>
                <Placeholder></Placeholder>
                <Placeholder></Placeholder>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                {enrolledClassrooms?.map((id, index) => <GetClassroom key={index} id={id}></GetClassroom>)}
                <Link to={"/classroom/create"}>
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-6 rounded-lg shadow-md cursor-pointer text-center">
                        <span className="text-5xl font-bold">+</span>
                        <p className="font-bold">Join Classroom</p>
                    </div>
                </Link>
            </div>}
        </div>
    );
};

export default JoinedClassrooms;