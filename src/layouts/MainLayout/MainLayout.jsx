
import { Link, Outlet } from "react-router-dom";
import ClassroomProvider from "../../context_api/ClassroomProvider/ClassroomProvider";
import useAuth from "../../hooks/Auth/useAuth";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Sidebar from "../../components/ClassroomComponent/Sidebar";


const MainLayout = () => {
  return (
    <ClassroomProvider>
      <div>
        <Navbar></Navbar>
        <div className='flex flex-row gap-2'>
          <Sidebar></Sidebar>
          <Outlet></Outlet>
        </div>
      </div>
    </ClassroomProvider>
  )

};

export default MainLayout;
