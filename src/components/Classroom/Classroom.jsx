import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png"
import useAuth from "../../hooks/Auth/useAuth";
import { handleGetMethod } from '../../utilities/handleGetMethod'
const Classroom = ({ classroom }) => {
  const { user } = useAuth()
  const [creator, setCreator] = useState();
  useEffect(() => {
    const getCreator = async (url) => {
      const result = await handleGetMethod(url);
      setCreator(result)
    }
    if (classroom?.creator) {
      const url = `http://localhost:3000/api/v1/users/${classroom.creator}`
      getCreator(url)
    }
  }, [classroom])
  return (
    <Link to={`/classroom/${classroom?._id}`}>
      <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover p-6 rounded-lg shadow-md min-h-fit cursor-pointer">
        <h1 className="text-xl font-bold">{classroom?.name}</h1>
        <h1 className="font-bold">Teacher: {creator?.name}</h1>
        <p>{classroom?.members ? classroom?.members?.length - 1 : 0} students</p>
        {user?.uid == classroom?.uid && <p>Code: {classroom?.code}</p>}
      </div>
    </Link>
  );
};

export default memo(Classroom);
