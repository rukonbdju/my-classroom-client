import React, { useEffect, useState } from 'react';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import { handlePutMethod } from '../../utilities/handlePutMethod';
import { handlePostMethod } from '../../utilities/handlePostMethod';
import handleDeleteMethod from '../../utilities/handleDeleteMethod';

const useManageClassroom = () => {
    const [classroom, setClassroom] = useState({})
    const [posts, setPosts] = useState([])
    const [postWriter, setPostWriter] = useState({})
    const [postResult,setPostResult]=useState({})
    const [updatedLike,setUpdatedLike]=useState({})

    //get posts by url with classroom id
    const getPosts = async (url) => {
        const data = await handleGetMethod(url);
        setPosts(data)
    }

    //get classroom by url with id
    const getClassroom = async (url) => {
        try {
            const result = await handleGetMethod(url);
            setClassroom(result);
        } catch {
            (err) => console.log(err);
        }
    };
    //get post writer by url with post user id
    const getPostWriter = async (url) => {
        const result = await handleGetMethod(url)
        setPostWriter(result);
    }

    //update like by url with two query post id and user id

    const updateLikes = async (url,postId,userId) => {
        console.log(postId)
        const result = await handlePutMethod(url);
        setUpdatedLike(result)
        const post =posts.find(p=>p._id==postId)
        post.likes.push([...post.likes,userId])
        console.log(post)
    }
    const updateUnLikes = async (url,postId,userId) => {
        console.log(postId)
        const result = await handleDeleteMethod(url);
        setUpdatedLike(result)
        console.log(result)
        const post =posts.find(p=>p._id==postId)
        post.likes.pop([...post.likes,userId])
        console.log(post)
    }

    //create new post
    const createNewPost = async (url,data) => {
        const result = await handlePostMethod(url, data)
        setPostResult(result)
        data._id = result.insertedId;
        setPosts(prevPost => [data, ...prevPost])
    }

    return { classroom, posts, postWriter,postResult,updatedLike, getClassroom, getPosts, getPostWriter,createNewPost, updateLikes,updateUnLikes }
};

export default useManageClassroom;