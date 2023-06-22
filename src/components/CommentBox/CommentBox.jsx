import React, { useEffect, useState } from 'react';
import { handlePutMethod } from '../../utilities/handlePutMethod';
import useAuth from '../../hooks/Auth/useAuth';
import Comments from '../Comments/Comments';
import { handlePostMethod } from '../../utilities/handlePostMethod';
import StaticComment from '../StaticComment/StaticComment';

const CommentBox = ({ postId }) => {
    const { user } = useAuth()
    const [comment, setComment] = useState('')
    const [staticComment, setStaticComment] = useState('')
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [commentResult, setCommentResult] = useState({})

    const getCommentFromUser = (event) => {
        const text = event.target.value;
        setComment(text)
    }

    const handleComment = async () => {
        try {
            setLoading(true)
            const data = {
                postId: postId,
                userId: user.uid,
                content: comment,
                timestamps: new Date().toString(),
                likes: [],
                replies: []
            }
            setStaticComment(data)
            const commentUrl = `https://my-classroom-server.onrender.com/api/v1/comments`
            const saveCommentResult = await handlePostMethod(commentUrl, data)
            const commentId = saveCommentResult.insertedId;
            const postUrl = `https://my-classroom-server.onrender.com/api/v1/posts/comment/${postId}`
            const saveRefToPost = await handlePutMethod(postUrl, { commentId })
            setCommentResult(saveRefToPost)
        } catch (error) {
            console.log(error)
        }
        finally{
            setComment('')
        }
    }
    return (
        <div className='my-4'>

            <div className='flex flex-row items-center border w-full border-slate-600 rounded-md'>
                <input
                    className=' w-full p-1 md:p-2 lg:p2  rounded-l-md outline-0'
                    placeholder='write comment'
                    type="text"
                    value={comment}
                    onChange={getCommentFromUser}
                    name="comment"
                    id="comment" />
                <button
                    onClick={() => handleComment()}
                    className='flex flex-row items-center gap-2 border rounded-r-md  p-2 outline-0 bg-slate-300 hover:bg-slate-400'>
                    <span className='hidden md:block lg:block'>comment</span>
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

            {commentResult?.acknowledged && <StaticComment staticComment={staticComment}></StaticComment>}
            <Comments postId={postId}></Comments>
        </div>
    );
};

export default CommentBox;