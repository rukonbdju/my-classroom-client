import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Navbar from "../../components/Navbar/Navbar";
import ClassroomPost from "../../components/ClassroomPost/ClassroomPost";
import useAuth from "../../hooks/Auth/useAuth";
import bg from "../../assets/bg/gradient-bg.png"
import Posts from "../../components/Posts/Posts";
import useClassroom from "../../hooks/classroom/useClassroom";
const MainLayout = () => {
  const { user } = useAuth();
  const params = useParams();
  const{classroom,posts,getClassroom,getPosts}=useClassroom()
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(()=>{
    const url = `http://localhost:3000/api/v1/classrooms/${params.id}`;
    getClassroom(url)
  },[params.id])
  

  useEffect(() => {
    const postUrl = `http://localhost:3000/api/v1/posts/query?class_id=${classroom?._id}`
    getPosts(postUrl)
    if (classroom?._id) {
    }
  }, [classroom?._id])

  if (classroom?.length === 0) {
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
    <div className={`${modalOpen&&"overflow-hidden"}`}>
      {modalOpen&&<ClassroomPost modalOpen={modalOpen} setModalOpen={setModalOpen} id={params.id} ></ClassroomPost>}
      <Navbar></Navbar>
      <div className=" w-2/3 mx-auto mt-24">
        <div style={{ backgroundImage: `url(${bg})` }} className="p-5 rounded-xl shadow-md bg-cover">
          <h1 className="text-3xl">{classroom?.name}</h1>
          <p className="font-bold">Teacher: {classroom?.creator}</p>
          <p className="my-4">{classroom?.description}</p>
          <p>{classroom?.students ? classroom?.students?.length : 0} Students</p>
        </div>
        <div>
          <div className="mt-4 flex flex-row gap-4">
            <button className="flex flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12">
              {user?.photoURL ? (
                <img src="user?.photoURL" />
              ) : (
                user?.displayName?.slice(0, 1)
              )}
            </button>
            <input
              onClick={() => setModalOpen(true)}
              className="px-4 rounded-full border w-full "
              placeholder="Start Class Discussion"
              type="text"
              name="post"
              id=""
            />
          </div>
        </div>

        <div>
          <Posts></Posts>
        </div>
      </div>
        
    </div>
  );
};

export default MainLayout;
