import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/Auth/useAuth';

const JoinWithLink = () => {
  const [searchParam] = useSearchParams();
  console.log(searchParam.get("code"))
  const code = searchParam.get("code")

  const { user } = useAuth();
  const handleJoinClassroom = async (e) => {
    try {
      const name = user.displayName;
      const email = user.email;
      const photo = user.photoURL;
      const userData = { name, email, photo }
      //add student in the classroom
      const url = `http://localhost:3000/api/v1/classrooms/${code}`
      const result = await handlePutMethod(url, userData)
      console.log(result)
      // add classroom in the user data
      if (result.classroomId) {
        const url = `http://localhost:3000/api/v1/users/${user.uid}`
        const id = result.classroomId
        const result2 = await handlePutMethod(url, { id });
        console.log(result2)
      }
    } catch {
      err => console.log(err)
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='font-bold'>Please wait a moment...</p>
    </div>
  );
};

export default JoinWithLink;