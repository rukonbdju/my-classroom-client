
import Classroom from "../Classroom/Classroom";
import { Link } from "react-router-dom";
import Placeholder from "../Shared/Placeholder";
import useCreatedClassroom from "../../hooks/API/useCreatedClassroom";

const CreatedClassrooms = () => {
const {loading,createdClassrooms}=useCreatedClassroom()
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
        {createdClassrooms?.map((classroom) => (
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
