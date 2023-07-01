import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import { handlePutMethod } from '../../utilities/handlePutMethod';
import { useNavigate } from 'react-router-dom';

const LeaveModal = ({ setOpenModal,classroomId }) => {
    const navigate = useNavigate()
    const {user}=useAuth()
    const handleLeaveClassroom=async()=>{
        try{
            const url=`http://localhost:3000/api/v1/classrooms/leave/${classroomId}`
            const data={userId:user.uid}
            const result =await handlePutMethod(url,data)
            if(result.deleteClassroomId.modifiedCount && result.deleteMemberInfo.modifiedCount){
                navigate('/classroom')
                setOpenModal(false)
            }
        }catch(error){
            console.log(error)
        }finally{
            setOpenModal(false)
        }
    }
    return (

        <div className='absolute  z-20 overflow-hidden w-full h-screen bg-opacity-40 flex items-center justify-center'>
            <div className='p-4 my bg-red-300 rounded shadow-2xl'>
                <p className='my-2'>Are you sure to leave this classroom?</p>
                <div className='flex flex-row justify-end gap-2'>
                    <button
                        onClick={() => setOpenModal(false)}
                        className='bg-red-700 text-white rounded-md p-1 text-sm'>Cancel</button>
                    <button
                        onClick={() => handleLeaveClassroom()}
                        className='bg-red-700 text-white rounded-md p-1 text-sm'>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default LeaveModal;