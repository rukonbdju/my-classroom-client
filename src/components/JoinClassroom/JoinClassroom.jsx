import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";

const JoinClassroom = () => {
  const { user } = useAuth();
  const handleJoinClassroom = async (e) => {
    e.target.classroomId.value;
    e.preventDefault();
  };
  return (
    <div className="max-w-xl mx-auto pt-28 rounded-lg bg-slate-100">
      <h1 className="text-5xl mb-6 text-center">Join Classroom!</h1>
      <form
        onSubmit={handleJoinClassroom}
        className="flex flex-col gap-6 items-center justify-center max-w-xl mx-auto"
      >
        <div className="w-full">
          <input
            required
            className="p-2 border-2 rounded-lg w-full"
            placeholder="Enter class code"
            type="text"
            name="classroomId"
            id="classroomId"
          ></input>
        </div>
        <input
          required
          className="p-2 border-2 rounded-lg w-full"
          placeholder="Enter class code"
          type="number"
          name="classCode"
          id="code"
        />
        <button
          className="w-full font-bold rounded-lg shadow-xl mb-4
             bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-3"
          type="submit"
        >
          Join Classroom
        </button>
      </form>
      <span>
        if you are a teacher create classroom{" "}
        <Link className="text-blue-700 hover:underline" to={"/create"}>
          here
        </Link>
      </span>
    </div>
  );
};

export default JoinClassroom;
