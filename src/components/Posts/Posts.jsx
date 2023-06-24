import React, { useEffect, useState } from 'react';
import Post from '../Post/Post'
import { handleGetMethod } from '../../utilities/handleGetMethod';
import CreatePost from '../CreatePost/CreatePost';
import useAuth from '../../hooks/Auth/useAuth';

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
        }
        if (classroom._id) {
            const url = `https://my-classroom-server.onrender.com/api/v1/posts?classId=${classroom._id}`
            getPosts(url)

        }
        setLoading(false)
    }, [classroom])
    if (loading) {
        return (
            <div className='p-2 my-2 bg-slate-100 border rounded'>
                <div className='flex flex-row gap-2 items-center'>
                    <div className='w-12 h-12 rounded-full bg-slate-500 m-1'></div>
                    <div className='h-4 w-1/5 rounded-full bg-slate-500 m-1'></div>
                </div>
                <div className='my-4'>
                    <p className='h-2 rounded-full w-3/4 bg-stone-500 m-1'></p>
                    <p className='h-2 rounded-full w-1/2 bg-stone-500 m-1'></p>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='bg-slate-300 h-6 basis-1/3 rounded'></div>
                    <div className='bg-slate-300 h-6 basis-1/3 rounded'></div>
                    <div className='bg-slate-300 h-6 basis-1/3 rounded'></div>
                </div>
            </div>
        )
    }

    return (
        <div className='pb-24'>
            {openModal && <div className='fixed z-50 top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50'>
                <CreatePost setPosts={setPosts} setOpenModal={setOpenModal}></CreatePost>
            </div>}

            <div>
                <div className="flex flex-row gap-2 mt-4">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.displayName?.slice(0, 1)}
                        </button>
                    </div>
                    <input
                        onClick={() => setOpenModal(true)}
                        className="px-4 rounded-full border w-full bg-slate-300 "
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