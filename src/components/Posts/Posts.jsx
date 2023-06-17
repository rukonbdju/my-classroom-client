import React, { useEffect, useState } from 'react';
import Post from '../Post/Post'

const Posts = ({ classroom }) => {
    let reversedArray = classroom?.posts?.slice().reverse();

    return (
        <div>
            {reversedArray?.map((postId) => <Post key={postId} postId={postId} post={reversedArray}></Post>)}
        </div>
    );
};

export default Posts;