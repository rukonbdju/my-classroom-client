import { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import { handlePostMethod } from '../../utilities/handlePostMethod';
import Loader from '../Loader/Loader';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Comment from '../Comment/Comment';
import Placeholder from './Placeholder';

const CommentBox = ({setCommentCount, postId }) => {
    const { user } = useAuth()
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])

    //get all comments of a post
    useEffect(()=>{
        setLoading(true)
        const getComments=async(url)=>{
            const result=await handleGetMethod(url)
            setComments(result)
            console.log(result)
            setLoading(false)
        }
        const url = `https://my-classroom-server.onrender.com/api/v1/comments?postId=${postId}`
        getComments(url)
    },[])

    //get user comment form input
    const getUserComment = (event) => {
        const text = event.target.value;
        setComment(text)
    }

    //comment save to database
    const handleComment = async () => {
        try {
            let data = {
                postId: postId,
                author: {
                    id:user.uid,
                    name:user.displayName,
                    photoURL:user.photoURL
                },
                content: comment,
                timestamps: new Date().toString(),
                likes: [],
                replies: []
            }
            setCommentCount((prevCount)=>prevCount+1)
            const commentUrl = `https://my-classroom-server.onrender.com/api/v1/comments`
            const saveCommentResult = await handlePostMethod(commentUrl, data)
            data._id=saveCommentResult.commentId;
            setComments(prev=>[data,...prev])
        } catch (error) {
            console.log(error)
        }
        finally{
            setComment('')
        }
    }

    if(loading){
        return <Placeholder></Placeholder>
    }
    
    return (
        <div className='my-4'>
            <div className='flex flex-row items-center border w-full border-slate-600 rounded-md'>
                <input
                    className=' w-full p-1 md:p-2 lg:p2  rounded-l-md outline-0'
                    placeholder='write comment'
                    type="text"
                    value={comment}
                    onChange={getUserComment}
                    name="comment"
                    id="comment" />
                <button
                    onClick={() => handleComment()}
                    className='flex flex-row items-center gap-2 border rounded-r-md  p-2 outline-0 bg-indigo-300 hover:bg-indigo-400'>
                    {loading&&<Loader></Loader>}
                    <span className='hidden md:inline lg:inline'>comment</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                </button>
            </div>
            {comments?.length?comments?.map((comment)=><Comment key={comment._id} setCommentCount={setCommentCount} setComments={setComments} comment={comment}></Comment>):<></>}
        </div>
    );
};

export default CommentBox;