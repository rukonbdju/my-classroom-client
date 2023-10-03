import { useState } from "react"
import useAuth from "../../hooks/Auth/useAuth"
import { handlePutMethod } from "../../utilities/handlePutMethod"
import Reply from "../Reply/Reply"

const ReplyBox = ({ comment }) => {
    const { user } = useAuth()
    const [userReply, setUserReply] = useState('')
    const [replies, setReplies] = useState(comment.replies)
    const getUserReply = (e) => {
        setUserReply(e.target.value)
    }
    const handleReply = async () => {
        try {

            let data = {
                commentId: comment._id,
                author: {
                    id: user.uid,
                    name: user.displayName,
                    photoURL: user.photoURL || ''
                },
                content: userReply,
                timestamps: new Date().toString(),
                likes: []
            }
            const commentUrl = `https://my-classroom-server.onrender.com/api/v1/comments/${comment._id}`
            await handlePutMethod(commentUrl, data)
            setUserReply('')
            setReplies(pre => [data, ...pre])
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="ml-8">
            <div className='flex flex-row gap-1 items-center justify-center my-2'>
                <div>
                    <button
                        className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-8 h-8"
                    >
                        {user.photoURL ? (
                            <img className='rounded-full' src={user.photoURL} />
                        ) : (
                            user.displayName?.slice(0, 1)
                        )}
                    </button>
                </div>
                <div className='flex flex-row items-center border w-full rounded-full bg-indigo-200 '>
                    <input
                        onChange={getUserReply}
                        className=' w-full p-1 outline-none bg-indigo-200 rounded-full'
                        placeholder='Reply here'
                        value={userReply}
                        type="text"
                        name="reply"
                        id="reply" />
                    <button
                        onClick={() => handleReply()}
                        className='flex flex-row items-center bg-indigo-300 hover:bg-indigo-400 gap-2 rounded-r-full p-1 outline-0'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z" />
                        </svg>
                        <span> Reply</span>
                    </button>
                </div>
            </div>
            {replies?.map((reply, index) => <Reply key={index} reply={reply} ></Reply>)}
        </div>
    )
}

export default ReplyBox