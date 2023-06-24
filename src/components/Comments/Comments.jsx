import React, { memo, useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Comment from '../Comment/Comment';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([])
    console.log(postId)
    useEffect(() => {
        const getPost = async (url) => {
            const result = await handleGetMethod(url)
            setComments(result.comments.reverse());
        }  
            console.log('ccc')
            const url = `https://my-classroom-server.onrender.com/api/v1/posts/${postId}`
            getPost(url)

    }, [])

    return (
        <>
            {comments?.map(commentId => <Comment
                key={commentId}
                commentId={commentId}>
            </Comment>)}
        </>
    );
};

export default Comments;