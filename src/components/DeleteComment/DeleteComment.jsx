import { useState } from "react"
import useAuth from "../../hooks/Auth/useAuth"
import handleDeleteMethod from "../../utilities/handleDeleteMethod"
import Loader from "../Loader/Loader"

const DeleteComment = ({ setCommentCount, setComments, comment }) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    //delete comment
    const handleDeleteComment = async () => {
        try {
            setLoading(true)
            const url = `https://my-classroom-server.onrender.com/api/v1/comments/${comment._id}`
            const data = {
                postId: comment.postId
            }
            const res = await handleDeleteMethod(url, data)
            setComments(prev => prev.filter(c => c._id !== res.commentId))
            setCommentCount(prev => prev - 1)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="absolute  top-2 right-2">
            <button className="relative group">
                <div className="flex items-center justify-center border rounded-full cursor-pointer
                    hover:bg-indigo-400 p-1">
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
                {comment?.author?.id == user.uid ? <div className="absolute hidden group-focus-within:block right-0 w-24 bg-indigo-300 rounded">
                    <div className='border'>
                        <p className="p-1 flex hover:bg-indigo-400 ">Edit</p>
                        <hr />
                        <div onClick={() => handleDeleteComment()} className="p-1 flex flex-row items-center gap-2 hover:bg-indigo-400 ">
                            {loading && <Loader></Loader>}<span>Delete</span>
                        </div>
                    </div>
                </div> : <></>}
            </button>
        </div>
    )
}

export default DeleteComment