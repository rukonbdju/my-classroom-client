import { useContext, useState } from "react";
import { PostContext } from "../../../context_api/PostProvider/PostProvider";
import useAuth from "../../../hooks/Auth/useAuth";
import { ClassroomContext } from "../../../context_api/ClassroomProvider/ClassroomProvider";
import Placeholder from "./Placeholder";
import CreatePost from "../../CreatePost/CreatePost";
import Post from "../Post/Post";
import PostLayout from "../../../layouts/PostLayout/PostLayout";

const Posts=()=>{
    const {classroom,dispatch}=useContext(ClassroomContext)
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    /* if (loading) {
        return <div className="grid grid-cols-1 gap-3 mt-6">
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
        </div>
    } */
    if (classroom?.posts?.length == 0) {
        return <div>
            {openModal && <CreatePost id={classroom._id} setOpenModal={setOpenModal}></CreatePost>}
            <div className='bg-indigo-300 p-2 rounded-md my-2'>
                <div className="flex flex-row items-center gap-2">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.photoURL ? <img className='rounded-full' src={user.photoURL} />
                                : user?.displayName?.slice(0, 1)}
                        </button>
                    </div>
                    <input
                        onClick={() => setOpenModal(true)}
                        className="px-4 py-2 rounded-full border border-slate-700 w-full bg-indigo-100 "
                        placeholder="Start Class Discussion"
                        type="text"
                        name="post"
                        id=""
                    />
                </div>
            </div>
            <div className="text-3xl flex items-center justify-center h-40 rounded-md bg-indigo-200">
                <h1 className="text-xl text-center">There are no posts in this classroom.</h1>
            </div>
        </div>
    }

    return (
        <div className='pb-24'>
            {openModal && <CreatePost id={classroom._id} setOpenModal={setOpenModal}></CreatePost>}
            <div className='bg-indigo-300 p-2 rounded-md my-2'>
                <div className="flex flex-row items-center gap-2">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.photoURL ? <img className='rounded-full' src={user?.photoURL} />
                                : user?.displayName?.slice(0, 1)}
                        </button>
                    </div>
                    <input
                        onClick={() => setOpenModal(true)}
                        className="px-4 py-2 rounded-full border border-slate-700 w-full bg-indigo-100 "
                        placeholder="Start Class Discussion"
                        type="text"
                        name="post"
                        id=""
                    />
                </div>
            </div>
            {classroom?.posts?.map((id) => <PostLayout key={id} id={id}></PostLayout>)}
        </div>
    );
}
export default Posts;