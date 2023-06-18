import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Classroom from "../Classroom/Classroom";
import { Link } from "react-router-dom";

const CreatedClassrooms = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const url = `http://localhost:3000/api/v1/classrooms/find/${user.uid}`;
    getClassrooms(url);
  }, [user.uid]);
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
        <div className="w-80 h-48 rounded-md bg-slate-300"></div>
        <div className="w-80 h-48 rounded-md bg-slate-300"></div>
        <div className="w-80 h-48 rounded-md bg-slate-300"></div>
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
