import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Classroom from "../Classroom/Classroom";
import { Link } from "react-router-dom";

const CreatedClassrooms = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
const placeholder=<div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
<div className="animate-pulse flex space-x-4">
  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
  <div className="flex-1 space-y-6 py-1">
    <div className="h-2 bg-slate-700 rounded"></div>
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
    </div>
  </div>
</div>
</div>

  useEffect(() => {
    const getClassrooms = async (url) => {
      try {
        setLoading(true);
        const result = await handleGetMethod(url);
        setClassrooms(result);
      } catch {
        (error) => console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/find/${user.uid}`;
    getClassrooms(url);
  }, [user.uid]);
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
        {placeholder}
        {placeholder}
        {placeholder}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
      {classrooms?.map((classroom) => (
        <Classroom key={classroom._id} classroom={classroom}></Classroom>
      ))}
      <Link to={"/classroom/create"}>
        <div className="bg-slate-200 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-300 text-center">
          <span className="text-5xl font-bold">+</span>
          <p className="font-bold">Create New Classroom</p>
        </div>
      </Link>
    </div>
  );
};

export default CreatedClassrooms;
