import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/bg/gradient-bg.png"

const Classroom = ({ classroom }) => {
  return (
    <Link to={`/classroom/${classroom._id}`}>
      <div style={{backgroundImage:`url(${bg})`}} className="bg-cover p-6 rounded-lg shadow-md min-h-fit cursor-pointer">
        <h1 className="text-xl font-bold">{classroom.name}</h1>
        <h1 className="font-bold">Teacher: {classroom.creator}</h1>
        <p>{classroom?.students ? classroom?.students?.length : 0} students</p>
      </div>
    </Link>
  );
};

export default Classroom;
