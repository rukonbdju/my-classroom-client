import React, { useEffect, useState } from 'react';
import Post from '../Post/Post'
import useClassroom from '../../hooks/classroom/useClassroom';

const Posts = () => {
    const {posts}=useClassroom();
    return (
        <div>
            {posts.map((post,index) => <Post key={index} post={post}></Post>)}
        </div>
    );
};

export default Posts;