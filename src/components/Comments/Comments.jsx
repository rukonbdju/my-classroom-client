import React, { memo, useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Comment from '../Comment/Comment';

const Comments = ({setComments, comments }) => {

    return (
        <>
            {comments?.map(commentId => <Comment
                key={commentId}
                setComments={setComments}
                commentId={commentId}>
            </Comment>)}
        </>
    );
};

export default Comments;