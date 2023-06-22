import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/Auth/useAuth";
import bg from "../../assets/bg/gradient-bg.png"
import Posts from "../../components/Posts/Posts";
import CreatePost from "../../components/CreatePost/CreatePost";
import LeaveModal from "../../components/LeaveModal/LeaveModal";
import ArchiveClassroom from "../../components/ArchiveClassroom/ArchiveClassroom";
const MainLayout = () => {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate()
  const [classroom, setClassroom] = useState({})
  const [creator, setCreator] = useState({})
  const [loading, setLoading] = useState(false)
  const [openModal,setOpenModal]=useState(false)
  const [classroomDeleteModal,setClassroomDeleteModal]=useState(false)

  useEffect(() => {
    //get classroom by url with id
    const getClassroom = async (url) => {
      try {
        setLoading(true)
        const result = await handleGetMethod(url);
        setClassroom(result);
        setLoading(false)
      } catch {
        (err) => console.log(err);
      }
    };
    const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/${params.id}`;
    getClassroom(url)
  }, [params.id])

  useEffect(() => {
    //get user by creator id
    const getCreator = async (url) => {
      try {
        setLoading(true)
        const result = await handleGetMethod(url)
        setCreator(result)
        if (result._id) {
          setLoading(false)
        }
      } catch {
        err => console.log(err)
      }
    }
    const url = `https://my-classroom-server.onrender.com/api/v1/users/${classroom?.creator}`;
    getCreator(url)
  }, [classroom])

  useEffect(() => {
    if (classroom?.members) {
      const idExists = classroom?.members?.some(member => member.userId === user.uid);
      if (!idExists) {
        navigate('/')
      }
    }
  }, [classroom, classroom?.members])

  if (loading || creator == null) {
    return (
      <div>
        <Navbar></Navbar>
        <div className=" animate-pulse bg-cover w-3/4 mt-24 mx-auto">
          <div className="rounded-md bg-slate-200 p-4">
            <div className="h-4 w-64 rounded-md bg-slate-600"></div>
            <div className="h-4 w-48 rounded-md mt-4 bg-slate-600"></div>
            <div className="mt-8">
              <div className="h-2 rounded-full mb-2-4 bg-slate-600"></div>
              <div className="h-2 rounded-full w-64 my-4 bg-slate-600"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 my-4">
            <div>
              <div className="w-12 h-12 rounded-full bg-slate-500"></div>
            </div>
            <div className="h-12 w-full rounded-full bg-slate-500"></div>
          </div>
          <div className='p-2 my-2 bg-slate-100 border rounded'>
            <div className='flex flex-row gap-2 items-center'>
              <div className='w-12 h-12 rounded-full bg-slate-700 m-1'></div>
              <div className='h-4 w-1/5 rounded-full bg-slate-700 m-1'></div>
            </div>
            <div className='my-4'>
              <p className='h-2 rounded-full w-3/4 bg-stone-700 m-1'></p>
              <p className='h-2 rounded-full w-1/2 bg-stone-700 m-1'></p>
            </div>
            <div className='flex flex-row gap-2'>
              <div className='bg-slate-700 h-6 basis-1/3 rounded'></div>
              <div className='bg-slate-700 h-6 basis-1/3 rounded'></div>
              <div className='bg-slate-700 h-6 basis-1/3 rounded'></div>
            </div>
          </div>
        </div>
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
              className="block mt-4 w-full rounded-md shadow-xl bg-gradient-to-r from-violet-500 to-fuchsia-500
                text-slate-100 px-4 py-2 uppercase"
            >
              Back to Classroom
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      {openModal && <LeaveModal setOpenModal={setOpenModal} classroomId={classroom._id}></LeaveModal>}
      {classroomDeleteModal && <ArchiveClassroom setClassroomDeleteModal={setClassroomDeleteModal} classroomId={classroom._id}></ArchiveClassroom>}
      <div className="w-11/12 md:w-5/6  lg:w-2/3 mx-auto mt-24">
        <div>
          <div style={{ backgroundImage: `url(${bg})` }} className="p-5 rounded-xl shadow-md bg-cover relative">
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
                <div className="absolute hidden group-focus-within:block right-0 w-24  bg-slate-400 rounded">
                  <div className='border'>
                    {classroom?.creator == user.uid ?
                      <div>
                        <p className="p-1 hover:bg-slate-300 ">Edit</p>
                        <hr />
                        <p onClick={()=>setClassroomDeleteModal(true)} className="p-1 hover:bg-slate-300 ">Archive</p>
                        <hr />
                        <p title={classroom.code} className="p-1 hover:bg-slate-300 ">View Code</p>
                      </div>

                      : <div>
                        <p onClick={()=>setOpenModal(true)} className="p-1 hover:bg-slate-300 ">Leave</p>
                      </div>}
                  </div>
                </div>
              </button>
            </div>
            <h1 className="text-3xl">{classroom?.name}</h1>
            <p className="font-bold">Teacher: {creator?.name}</p>
            <p className="my-4">{classroom?.description}</p>
            <p>{classroom?.members?.length - 1} Students</p>
          </div>
        </div>
        <Posts classroom={classroom}></Posts>
      </div>
    </div>
  );
};

export default MainLayout;
