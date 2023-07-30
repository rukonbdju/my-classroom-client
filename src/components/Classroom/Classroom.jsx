import { Link } from "react-router-dom";

const Classroom = ({ classroom }) => {
  return (
    <Link to={`/classroom/${classroom?._id}`}>
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-6 rounded-lg shadow-md min-h-fit cursor-pointer">
        <h1 className="text-xl font-bold">{classroom?.name}</h1>
        <h1 className="font-bold">Teacher: {classroom?.author?.name}</h1>
        <p>{classroom?.members ? classroom?.members?.length - 1 : 0} students</p>
      </div>
    </Link>
  );
};

export default Classroom;
