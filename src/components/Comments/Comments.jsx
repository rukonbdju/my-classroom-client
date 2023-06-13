import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Comment from '../Comment/Comment';

const Comments = ({ comments }) => {
    
    return (
        <div>
            {comments?.map(comment=><Comment key={comment.timestamps} comment={comment}></Comment>)}
        </div>
    );
};

export default Comments;