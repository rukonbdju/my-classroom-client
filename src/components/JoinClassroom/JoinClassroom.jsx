import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePutMethod } from "../../utilities/handlePutMethod";

const JoinClassroom = () => {
  const { user } = useAuth();
  const handleJoinClassroom = async (e) => {
    e.preventDefault();
    try{
    const code=e.target.code.value;
    const name=user.displayName;
    const email=user.email;
    const photo=user.photoURL;
    const userData={name,email,photo}
    //add student in the classroom
    const url=`http://localhost:3000/classrooms/${code}`
      const result = await handlePutMethod(url,userData)
      console.log(result)
      // add classroom in the user data
      if(result.classroomId){
        const url=`http://localhost:3000/users/${user.uid}`
        const id=result.classroomId
        const result2=await handlePutMethod(url,{id});
        console.log(result2)
      }
    }catch{
      err=>console.log(err)
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
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
