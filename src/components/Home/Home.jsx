import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import CreatedClassrooms from "../CreatedClassrooms/CreatedClassrooms";
import JoinedClassrooms from "../JoinedClassrooms/JoinedClassrooms";
import ArchivedClassroom from "../ArchivedClassroom/ArchivedClassroom";
import Placeholder from "../Shared/Placeholder";

const Home = memo(() => {
  const { user } = useAuth();
  //state
  const [enrolledClassrooms, setEnrolledClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  //get enrolled classrooms
  useEffect(() => {
    const getEnrolledClassrooms = async (url) => {
      try {
        setLoading(true);
        const result = await handleGetMethod(url);
        setEnrolledClassrooms(result);
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
    <div className="">
      <div className="w-5/6 mx-auto mt-24">
        <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold ">
            Welcome {user?.displayName} to your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              classroom
            </span>
          </h1>
          <p className="mt-4">
            Join your classroom and see your class materials, schedule and so on
            or create a new classroom.
          </p>
        </div>
        <div className="my-12">
          <h3 className="text-2xl pb-2 border-b border-slate-700">
            Created Classroom
          </h3>
          <CreatedClassrooms></CreatedClassrooms>
        </div>
        <div className="">
          <h3 className="text-2xl pb-2 border-b border-slate-700">
            Enrolled Classroom
          </h3>
          {loading ? <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
            {enrolledClassrooms?.joined?.map((id) => (
              <JoinedClassrooms key={id} id={id}></JoinedClassrooms>
            ))}
            <Link to={"/classroom/join"}>
              <div className="bg-slate-200 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-300 text-center">
                <span className="text-5xl font-bold">+</span>
                <p className="font-bold">Join New Classroom</p>
              </div>
            </Link>
          </div>}
        </div>
        <div className="my-12">
          <h3 className="text-2xl pb-2 border-b border-slate-700">
            Archived Classroom
          </h3>
          <ArchivedClassroom></ArchivedClassroom>
        </div>
      </div>
    </div>
  );
});

export default Home;
