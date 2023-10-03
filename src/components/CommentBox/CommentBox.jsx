import { useEffect, useReducer, useState } from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import { handlePostMethod } from '../../utilities/handlePostMethod';
import Loader from '../Loader/Loader';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Comment from '../Comment/Comment';
import Placeholder from './Placeholder';
import ReplyBox from '../ReplyBox/ReplyBox';
import CommentReducer from '../../reducer/CommentReducer/CommentReducer';

const CommentBox = ({ post,dispatch}) => {
    const { user } = useAuth()
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    //const [comments, setComments] = useState([])
    const [comments,commentDispatch]=useReducer(CommentReducer,[])
    //get all comments of a post
    useEffect(() => {
        setLoading(true)
        const getComments = async (url) => {
            const result = await handleGetMethod(url)
            console.log(result)
            commentDispatch({
                type:"initialValue",
                payload:result
            })
            setLoading(false)
        }
        const url = `http://localhost:3000/api/v1/comments?postId=${post._id}`
         getComments(url)
         
    }, [])

    //get user comment form input
    const getUserComment = (event) => {
        const text = event.target.value;
        setComment(text)
    }

    //comment save to database
    const handleComment = async () => {
        try {
            let data = {
                postId: post._id,
                author: {
                    id: user.uid,
                    name: user.displayName,
                    photoURL: user.photoURL
                },
                content: comment,
                timestamps: new Date().toString(),
                likes: [],
                replies: []
            }
            const commentUrl = `http://localhost:3000/api/v1/comments`
            const saveCommentResult = await handlePostMethod(commentUrl, data)
            data._id = saveCommentResult.commentId;
            dispatch({
                type:'updateComments',
                payload:{
                    commentId:saveCommentResult.commentId
                }
            })
            commentDispatch({
                type:'add',
                payload:data
            })
            //setComments((prevComments)=>[data,...prevComments])
        } catch (error) {
            console.log(error)
        }
        finally {
            setComment('')
        }
    }

    if (loading) {
        return <Placeholder></Placeholder>
    }

    return (
        <div className='my-4 border rounded-lg p-2'>
            <div className='flex flex-row items-center gap-2 w-full'>
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
                <div className='flex flex-row w-full bg-indigo-200 rounded-full'>
                    <input
                        className=' w-full p-1  rounded-l-full bg-indigo-200 outline-0'
                        placeholder='write comment'
                        type="text"
                        value={comment}
                        onChange={getUserComment}
                        name="comment"
                        id="comment" />
                    <button
                        onClick={() => handleComment()}
                        className='rounded-r-full  px-4 outline-0 bg-indigo-300 hover:bg-indigo-400'>
                        {loading && <Loader></Loader>}
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
            </div>
            {comments?.length ? comments?.map((comment) => <Comment
                key={comment._id}
                commentDispatch={commentDispatch}
                dispatch={dispatch}
                comment={comment}
            ></Comment>) : <></>}
        </div>
    );
};

export default CommentBox;