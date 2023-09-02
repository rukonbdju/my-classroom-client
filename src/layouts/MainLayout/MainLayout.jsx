/* import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/Auth/useAuth";
import Posts from "../../components/Posts/Posts";
import LeaveModal from "../../components/LeaveModal/LeaveModal";
import ArchiveClassroom from "../../components/ArchiveClassroom/ArchiveClassroom";
import Placeholder from "./Placeholder";
import PostLayout from "../PostLayout/PostLayout"; */

import ClassrooomInfo from "../../components/ClassroomComponent/ClassroomInfo";
import ClassroomProvider from "../../context_api/ClassroomProvider/ClassroomProvider";
import CommentProvider from "../../context_api/CommentProvider/CommentProvider";
import PostProvider from "../../context_api/PostProvider/PostProvider";


const MainLayout = () => {
  return (
  <ClassroomProvider>
    <PostProvider>
      <CommentProvider>
        <ClassrooomInfo/>
      </CommentProvider>
    </PostProvider>
  </ClassroomProvider>
 )

};

export default MainLayout;




/* 
 const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate()
  //state 
  const [classroom, setClassroom] = useState({})
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [classroomDeleteModal, setClassroomDeleteModal] = useState(false)
  useEffect(() => {
    //get classroom by id
    const getClassroom = async (url) => {
      try {
        setLoading(true)
        const result = await handleGetMethod(url);
        setClassroom(result);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/${params.id}`;
    getClassroom(url)
  }, [])

  useEffect(() => {
    const iSExists = classroom?.members?.find(member => member.userId === user.uid);
    if (!iSExists?.userId && classroom?.members) {
      navigate("/classroom")
    }
  }, [classroom?.name])

  if (loading) {
    return (
      <div>
        <Navbar></Navbar>
        <Placeholder></Placeholder>
      </div>
    )
  }
  if (classroom == null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border rounded-md p-5 shadow-lg">
          <h1 className="text-2xl">Classroom not found.</h1>
          <Link to={"/classroom"}>
            <button
              className="block mt-4 w-full rounded-md shadow-xl bg-gradient-to-r from-sky-500 to-indigo-500
                text-slate-100 px-4 py-2 uppercase"
            >
              Back to Classroom
            </button>
          </Link>
        </div>
      </div>
    );
  }
  if (classroom.name) return (
    <div>
      <Navbar></Navbar>
      {openModal && <LeaveModal setOpenModal={setOpenModal} classroomId={classroom._id}></LeaveModal>}
      {classroomDeleteModal && <ArchiveClassroom setClassroomDeleteModal={setClassroomDeleteModal} classroomId={classroom._id}></ArchiveClassroom>}
      <div className="w-11/12 md:w-5/6  lg:w-2/3 mx-auto mt-20">
        <div>
          <div className="p-5 rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-sky-500 relative">
            <div className="absolute top-1 right-1">
              <button className="relative group">
                <div className="flex items-center justify-center border rounded-full cursor-pointer
               hover:bg-slate-300 p-1">
                  <svg
                    className="block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                </div>
                <div className="absolute hidden group-focus-within:block right-0 w-24  bg-indigo-400 rounded">
                  <div className='border'>
                    {classroom?.author?.id == user.uid ?
                      <div>
                        <p className="p-1 hover:bg-slate-300 ">Edit</p>
                        <hr />
                        <p onClick={() => setClassroomDeleteModal(true)} className="p-1 hover:bg-slate-300 ">Archive</p>
                        <hr />
                        <p className="p-1 hover:bg-slate-300 ">Code: <span className="text-red-500">{classroom.code}</span></p>
                      </div>

                      : <div>
                        <p onClick={() => setOpenModal(true)} className="p-1 hover:bg-slate-300 ">Leave</p>
                      </div>}
                  </div>
                </div>
              </button>
            </div>
            <h1 className="text-3xl">{classroom?.name}</h1>
            <p className="font-bold">Teacher: {classroom?.author?.name}</p>
            <p className="my-1">{classroom?.description}</p>
            <Link to={`/classroom/${classroom?._id}/students`}>
              <p className="hover:underline ">{classroom?.members?.length - 1} Students</p>
            </Link>
          </div>
        </div>
        {classroom?.name && <Posts classroom={classroom}></Posts>}
        
      </div>
    </div>
  );
*/