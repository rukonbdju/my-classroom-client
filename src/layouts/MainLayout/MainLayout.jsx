import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/Auth/useAuth";
import bg from "../../assets/bg/gradient-bg.png"
import Posts from "../../components/Posts/Posts";
import CreatePost from "../../components/CreatePost/CreatePost";
const MainLayout = () => {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate()
  const [classroom, setClassroom] = useState({})
  const [creator, setCreator] = useState({})
  const [modalOpen, setModalOpen] = useState(false);
  const [postResult, setPostResult] = useState({})

  useEffect(() => {
    //get classroom by url with id
    const getClassroom = async (url) => {
      try {
        const result = await handleGetMethod(url);
        setClassroom(result);
      } catch {
        (err) => console.log(err);
      }
    };
    const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/${params.id}`;
    getClassroom(url)
  }, [params.id, postResult])


  useEffect(() => {
    //get user by creator id
    const getCreator = async (url) => {
      try {
        const result = await handleGetMethod(url)
        setCreator(result)
      } catch {
        err => console.log(err)
      }
    }

    const url = `https://my-classroom-server.onrender.com/api/v1/users/${classroom?.creator}`;
    getCreator(url)


  }, [classroom, classroom?.creator])


  useEffect(() => {
    if (classroom?.members) {
      const idExists = classroom?.members?.some(member => member.userId === user.uid);
      if (!idExists) {
        navigate('/')
      }
    }
  }, [classroom, classroom?.members])

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
    <div className={`${modalOpen && "overflow-hidden"}`}>
      {modalOpen && <CreatePost
        classroom={classroom}
        setModalOpen={setModalOpen}
        setPostResult={setPostResult}>
      </CreatePost>}
      <Navbar></Navbar>
      <div className="w-11/12 md:w-5/6  lg:w-2/3 mx-auto mt-24">
        {(classroom?._id && creator?._id) ? <div>
          <div style={{ backgroundImage: `url(${bg})` }} className="p-5 rounded-xl shadow-md bg-cover">
            <h1 className="text-3xl">{classroom?.name}</h1>
            <p className="font-bold">Teacher: {creator?.name}</p>
            <p className="my-4">{classroom?.description}</p>
            <p>{classroom?.members?.length - 1} Students</p>
          </div>
          <div>
            <div className="flex flex-row gap-2 mt-4">
              <div>
                <button
                  className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                  {user?.photoURL ? (
                    <img src="user?.photoURL" />
                  ) : (
                    user?.displayName?.slice(0, 1)

                  )}
                </button>
              </div>
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
        </div> : <div className=" bg-cover">
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
        </div>}

        <Posts classroom={classroom}></Posts>
      </div>

    </div>
  );
};

export default MainLayout;
