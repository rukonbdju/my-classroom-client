import { useContext, useState } from "react"
import useAuth from "../../hooks/Auth/useAuth"
import handleDeleteMethod from "../../utilities/handleDeleteMethod"
import Loader from "../Loader/Loader"
import { ClassroomContext } from "../../context_api/ClassroomProvider/ClassroomProvider"

const DeletePost = ({post}) => {
    const {user}=useAuth()
    const [loading,setLoading]=useState(false)
    const {dispatch}=useContext(ClassroomContext)
    const handleDeletePost = async () => {
        setLoading(true)
        const url = `https://my-classroom-server.onrender.com/api/v1/posts?id=${post._id}&classId=${post.classId}`
        const result=await handleDeleteMethod(url)
        dispatch({
            type:'delete',
            payload:{
                postId:post?._id
            }
        })
        setLoading(false)
    }
    const handleEditPost = async () => {
       //edit post  
        
    }
    return (
        <div className="absolute  top-1 right-1">
            <button className="relative group">
                <div className="flex items-center justify-center border rounded-full cursor-pointer
               hover:bg-slate-400 p-1">
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
                {post?.author?.id == user.uid ? <div className="absolute hidden group-focus-within:block right-0 w-24 bg-slate-400 rounded">
                    <div className='border'>
                        <p onClick={() => handleEditPost()} className="p-1 flex flex-row items-center gap-2 hover:bg-slate-300 ">
                            {loading && <Loader></Loader>}<span>Edit</span>
                        </p>
                        <hr />
                        <p onClick={() => handleDeletePost()} className="p-1 flex flex-row items-center gap-2 hover:bg-slate-300 ">
                            {loading && <Loader></Loader>}<span>Delete</span>
                        </p>
                    </div>
                </div> : <></>}
            </button>
        </div>
    )
}
export default DeletePost