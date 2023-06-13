import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Classroom from '../Classroom/Classroom';

const JoinedClassrooms = ({id}) => {
    const [classroom,setClassroom]=useState({})

    useEffect(()=>{
        const getClassroom=async(url)=>{
            try{
                const result=await handleGetMethod(url);
                setClassroom(result)

            }catch{
                err=>console.log(err)
            }
        }
        const url=`http://localhost:3000/api/v1/classrooms/${id}`
        getClassroom(url)
    },[])
    return (
        <Classroom classroom={classroom}></Classroom>
    );
};

export default JoinedClassrooms;