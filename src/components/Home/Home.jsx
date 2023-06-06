import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/Auth/useAuth';

const Home = () => {
    const {user}=useAuth();
    return (
        <div className="pt-24 flex flex-col items-center justify-center">
      <div className="w-5/6 text-center mb-12">
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
      <div className="w-5/6">
        <h3 className="text-2xl pb-2 border-b border-slate-700">
          Created Classroom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
          
          <Link to={'/create'}>
          <div className="bg-slate-200 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-300 text-center">
            <span className="text-5xl font-bold">+</span>
            <p className="font-bold">Create New Classroom</p>
          </div></Link>
        </div>
      </div>
      <div className="w-5/6">
        <h3 className="text-2xl pb-2 border-b border-slate-700">
          Enrolled Classroom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
          
          <Link to={'/join'}>
          <div className="bg-slate-200 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-300 text-center">
            <span className="text-5xl font-bold">+</span>
            <p className="font-bold">Join New Classroom</p>
          </div></Link>
        </div>
      </div>
    </div>
    );
};

export default Home;