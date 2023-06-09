import { useEffect, useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Classroom from "../Classroom/Classroom";
import { Link } from "react-router-dom";
import Placeholder from "../Shared/Placeholder";

const CreatedClassrooms = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  //get classroom
  useEffect(() => {
    const getClassrooms = async (url) => {
      try {
        setLoading(true);
        const result = await handleGetMethod(url);
        setClassrooms(result?.filter(classroom => !(classroom?.archived?.find(id => id == user.uid))))
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/find/${user.uid}`;
    getClassrooms(url);
  }, []);
  return (
    <div className="my-12">
      <h3 className="text-2xl pb-2 border-b border-indigo-700">
        Created Classroom
      </h3>
      {loading ? <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
        <Placeholder></Placeholder>
        <Placeholder></Placeholder>
        <Placeholder></Placeholder>
      </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
        {classrooms?.map((classroom) => (
          <Classroom key={classroom._id} classroom={classroom}></Classroom>
        ))}
        <Link to={"/classroom/create"}>
          <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-6 rounded-lg shadow-md cursor-pointer text-center">
            <span className="text-5xl font-bold">+</span>
            <p className="font-bold">Create New Classroom</p>
          </div>
        </Link>
      </div>}
    </div>
  );
};

export default CreatedClassrooms;
