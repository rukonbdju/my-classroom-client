import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Comment from '../Comment/Comment';

const Comments = ({ postId }) => {
    const [post, setPost] = useState({})
    const [isComment, setIsComment] = useState(false)
    useEffect(() => {
        const getPost = async (url) => {
            const result = await handleGetMethod(url)
            setPost(result);
        }
        if (postId) {
            const url = `https://my-classroom-server.onrender.com/api/v1/posts/${postId}`
            getPost(url)
        }

    }, [postId,isComment])

    return (
        <>
            {post?.comments?.map(commentId => <Comment
                key={commentId}
                commentId={commentId}
                setIsComment={setIsComment}>
            </Comment>)}
        </>
    );
};

export default Comments;