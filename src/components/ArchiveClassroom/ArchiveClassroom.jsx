import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/Auth/useAuth';
import { handlePutMethod } from '../../utilities/handlePutMethod';

const ArchiveClassroom = ({setClassroomDeleteModal,classroomId}) => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [loading,setLoading]=useState(false)
    const handleDeleteClassroom = async () => {
        try {
            setLoading(true)
            const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/archive/${classroomId}`
            const data={isArchived:true}
            const result = await handlePutMethod(url,data)
            if(result.modifiedCount){
                setLoading(false)
                navigate('/classroom')
                setClassroomDeleteModal(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setClassroomDeleteModal(false)
        }
    }
    return (
        <div className='absolute  z-20 overflow-hidden w-full h-screen bg-opacity-40 flex items-center justify-center'>
            <div className='p-4 my bg-red-300 rounded shadow-2xl'>
                <p className='my-2'>Are you sure to archive this classroom?</p>
                <div className='flex flex-row justify-end gap-2'>
                    <button
                        onClick={() => setClassroomDeleteModal(false)}
                        className='bg-red-700 text-white rounded-md p-1 text-sm'>Cancel</button>
                    <button
                        onClick={() => handleDeleteClassroom()}
                        className='bg-red-700 text-white rounded-md p-1 text-sm'>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ArchiveClassroom;