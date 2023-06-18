import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePutMethod } from "../../utilities/handlePutMethod";
import bg from "../../assets/bg/gradient-bg.png"
import Loader from "../Loader/Loader"

const JoinClassroom = () => {
  const navigate=useNavigate()
  const { user } = useAuth();
  const [isJoined,setIsJoined]=useState({})
  const [loading,setLoading]=useState(false)

  const handleJoinClassroom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const code = e.target.code.value;
      //add student in the classroom
      const url = `http://localhost:3000/api/v1/classrooms/join/${code}`
      const data = {
        userId: user.uid,
        role: 'student'
      }
      const result = await handlePutMethod(url, data)

      // add classroom in the user data
      const id = result.classroomId;
      const url2 = `http://localhost:3000/api/v1/users/joined/${user.uid}`
      const updateUserResult = await handlePutMethod(url2, { id });
      setIsJoined(updateUserResult)
      setLoading(false)
      e.target.reset()
    } catch {
      err => console.log(err)
    }
  };

  useEffect(()=>{
    if(isJoined.acknowledged){
      navigate('/classroom')
    }
  },[isJoined.acknowledged])

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="w-screen h-screen flex items-center justify-center bg-cover">
      <div className="w-5/6 mx-auto">
        <form
          onSubmit={handleJoinClassroom}
          className="flex flex-col gap-6 items-center justify-center max-w-xl mx-auto"
        >
          <h1 className="text-5xl mb-6 text-center">Join Classroom!</h1>
          <input
            required
            className="p-2 border-2 rounded-lg w-full"
            placeholder="Enter class code"
            type="text"
            name="code"
            id="code"
          />
          <button
            className="w-full font-bold rounded-lg shadow-xl mb-4
             bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
            type="submit"
          >
            {loading&&<Loader></Loader>}
            Join Classroom
          </button>
          <span>
            if you are a teacher create classroom{" "}
            <Link className="text-blue-700 hover:underline" to={"/classroom/create"}>
              here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default JoinClassroom;
