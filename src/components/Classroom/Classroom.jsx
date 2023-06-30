import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png"
import useAuth from "../../hooks/Auth/useAuth";
import { handleGetMethod } from '../../utilities/handleGetMethod'
const Classroom = ({ classroom }) => {
  return (
    <Link to={`/classroom/${classroom?._id}`}>
      <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover p-6 rounded-lg shadow-md min-h-fit cursor-pointer">
        <h1 className="text-xl font-bold">{classroom?.name}</h1>
        <h1 className="font-bold">Teacher: {classroom?.author?.name}</h1>
        <p>{classroom?.members ? classroom?.members?.length - 1 : 0} students</p>
      </div>
    </Link>
  );
};

export default Classroom;
