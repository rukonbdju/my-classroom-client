import React, { useEffect, useState } from 'react';
import { handlePutMethod } from '../../utilities/handlePutMethod';
import useAuth from '../../hooks/Auth/useAuth';
import Comments from '../Comments/Comments';
import { handleGetMethod } from '../../utilities/handleGetMethod';

const CommentBox = ({ id }) => {
    const { user } = useAuth()
    const [comment, setComment] = useState('')
    const [formData, setFormData] = useState('')
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(comments)

    useEffect(() => {
        const handleGetComments = async (url) => {
            try {
                setLoading(true)
                const result = await handleGetMethod(url);
                console.log(result)
                setComments(result?.comments?.reverse())
            } catch {
                err => console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        const url = `http://localhost:3000/api/v1/posts/query?id=${id}`
        handleGetComments(url);

    }, [])
    const handleCommentText = (event) => {
        const text = event.target.value;
        setComment(text)
    }
    const handleComment = async () => {
        try {
            const timestamps = new Date().toString()
            console.log(timestamps)
            const userId = user.uid;
            const data = { userId, comment, timestamps }
            setFormData(data)
            console.log(data)
            const url = `http://localhost:3000/api/v1/posts/${id}`
            const result = await handlePutMethod(url, data)
            setComments(prevComment =>prevComment? [data, ...prevComment]:[data])
            console.log(result)
        } catch {
            error => { console.log(error) }
        }
    }
    return (
        <div className='my-4'>
            
            <div className='flex flex-row items-center gap-2'>
                <input
                    className='border w-full border-green-400 rounded-md p-1 outline-0'
                    placeholder='write comment'
                    type="text"
                    value={comment}
                    onChange={handleCommentText}
                    name="comment"
                    id="comment" />
                <button
                    onClick={() => handleComment()}
                    className='border ml-2 rounded-md p-2 outline-0 bg-green-400'>
                    <svg
                        className='text-slate-50'
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                </button>
            </div>
            <Comments comments={comments}></Comments>
        </div>
    );
};

export default CommentBox;