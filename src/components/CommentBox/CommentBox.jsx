import { useContext, useState } from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import { handlePostMethod } from '../../utilities/handlePostMethod';
import Loader from '../Loader/Loader';
import Comment from '../Comment/Comment';
import Placeholder from './Placeholder';
import { PostContext } from '../../context_api/PostProvider/PostProvider';
import { CommentContext } from '../../context_api/CommentProvider/CommentProvider';

const CommentBox = () => {
    const { post, dispatch } = useContext(PostContext)
    const { loading, comments, commentDispatch } = useContext(CommentContext)
    const { user } = useAuth()
    const [comment, setComment] = useState('')

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
            const commentUrl = `https://my-classroom-server.onrender.com/api/v1/comments`
            const saveCommentResult = await handlePostMethod(commentUrl, data)
            data._id = saveCommentResult.commentId;
            dispatch({
                type: 'updateComments',
                payload: {
                    commentId: saveCommentResult.commentId
                }
            })
            commentDispatch({
                type: 'add',
                payload: data
            })
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
        <div className='my-4 rounded-lg p-2'>
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
            <div>
                {
                    comments?.length ? comments?.map((comment) => <Comment key={comment._id} comment={comment}></Comment>)
                        : <p className='p-2 my-4 border rounded'>No comment found.</p>
                }
            </div>
        </div>
    );
};

export default CommentBox;