import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePutMethod } from "../../utilities/handlePutMethod";
import Loader from "../Loader/Loader"

const JoinClassroom = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isFound, setIsFound] = useState(true)
  const [isAlreadyJoined, setIsAlreadyJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isFound || isAlreadyJoined) {
      setTimeout(() => {
        setIsFound(true)
        setIsAlreadyJoined(false)
      }, 3000)
    }
  }, [isFound])
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
      if (!result) {
        setIsFound(false)
        return
      }
      if (result.matchedCount == 0) {
        setIsFound(false)
      }
      if (result.matchedCount) {
        if (result.modifiedCount) {
          navigate('/classroom')
        }
        else {
          setIsAlreadyJoined(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)

    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 mx-auto">
        <form
          onSubmit={handleJoinClassroom}
          className="flex flex-col gap-6 items-center justify-center max-w-xl mx-auto"
        >
          <h1 className="text-5xl mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 py-1">Join Classroom!</h1>
          <input
            required
            className="p-2 border-2 rounded-lg w-full outline-indigo-700"
            placeholder="Enter class code"
            type="text"
            name="code"
            id="code"
          />
          {!isFound && <div
            className="absolute top-32 right-24 text-sm bg-orange-700 flex flex-row items-center gap-2 rounded font-bold p-2  transition-all duration-500 ease-in-out shadow-2xl text-slate-50 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <span>Classroom not found.</span>
          </div>}
          {isAlreadyJoined && <div
            className="absolute top-32 right-24 text-sm bg-orange-700 flex rounded flex-row items-center gap-2 font-bold p-2 shadow-2xl text-slate-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <span>You have already joined to the classroom.</span>
          </div>}
          <button
            className="w-full flex flex-row item justify-center font-bold rounded-lg shadow-xl mb-4
             bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-100 px-4 uppercase py-2"
            type="submit"
          >
            {loading && <Loader></Loader>}
            <span>Join Classroom</span>
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
