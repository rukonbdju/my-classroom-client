import React, { useEffect, useState } from 'react';
import Post from '../Post/Post'
import { handleGetMethod } from '../../utilities/handleGetMethod';
import CreatePost from '../CreatePost/CreatePost';
import useAuth from '../../hooks/Auth/useAuth';
import { Link } from 'react-router-dom';
import Placeholder from './Placeholder';

const Posts = ({ classroom }) => {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getPosts = async (url) => {
            const result = await handleGetMethod(url)
            setPosts(result)
            setLoading(false)
        }
        const url = `https://my-classroom-server.onrender.com/api/v1/posts?classId=${classroom._id}`
        getPosts(url)
    }, [])
    if (loading) {
        return <Placeholder></Placeholder>
    }

    return (
        <div className='pb-24'>
            {openModal && <CreatePost id={classroom._id} setOpenModal={setOpenModal} setPosts={setPosts}></CreatePost>}
            <div>
                <div className="flex flex-row items-center gap-2 mt-4">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.photoURL?<img className='rounded-full' src={user.photoURL}/>
                            :user?.displayName?.slice(0, 1)}
                        </button>
                    </div>
                    <input
                        onClick={() => setOpenModal(true)}
                        className="px-4 py-2 rounded-full border border-slate-700 w-full bg-slate-200 "
                        placeholder="Start Class Discussion"
                        type="text"
                        name="post"
                        id=""
                    />
                </div>
            </div>
            {posts?.map((post) => <Post key={post._id} post={post} setPosts={setPosts}></Post>)}
        </div>
    );
};

export default Posts;