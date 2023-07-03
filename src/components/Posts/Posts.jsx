import React, { useEffect, useState } from 'react';
import Post from '../Post/Post'
import { handleGetMethod } from '../../utilities/handleGetMethod';
import CreatePost from '../CreatePost/CreatePost';
import useAuth from '../../hooks/Auth/useAuth';
import Placeholder from './Placeholder';

const Posts = ({ classroom }) => {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            setPage((prevPage) => prevPage < 20 ? prevPage + 1 : prevPage);
        }
    };

    useEffect(() => {
        if (page < 2) {
            setLoading(true)
        }
        const getPosts = async (url) => {
            const result = await handleGetMethod(url)
            if (page === 1) {
                setPosts(result);
            }
            else {
                setPosts(prevPosts => [...prevPosts, ...result]);
            }
            setLoading(false)
        }
        if (page < 20) {
            const url = `https://my-classroom-server.onrender.com/api/v1/posts?classId=${classroom._id}&page=${page}`
            getPosts(url)
        }

    }, [page])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (loading) {
        return <div className="grid grid-cols-1gap-3 mt-6">
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
        </div>
    }
    if (posts.length == 0) {
        return <div>
            {openModal && <CreatePost id={classroom._id} setOpenModal={setOpenModal} setPosts={setPosts}></CreatePost>}
            <div className='bg-indigo-300 p-2 rounded-md my-2'>
                <div className="flex flex-row items-center gap-2">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.photoURL ? <img className='rounded-full' src={user.photoURL} />
                                : user?.displayName?.slice(0, 1)}
                        </button>
                    </div>
                    <input
                        onClick={() => setOpenModal(true)}
                        className="px-4 py-2 rounded-full border border-slate-700 w-full bg-indigo-100 "
                        placeholder="Start Class Discussion"
                        type="text"
                        name="post"
                        id=""
                    />
                </div>
            </div>
            <div className="text-3xl flex items-center justify-center h-40 rounded-md bg-indigo-200">
                <h1 className="text-xl text-center">There are no posts in this classroom.</h1>
            </div>
        </div>
    }

    return (
        <div className='pb-24'>
            {openModal && <CreatePost id={classroom._id} setOpenModal={setOpenModal} setPosts={setPosts}></CreatePost>}
            <div className='bg-indigo-300 p-2 rounded-md my-2'>
                <div className="flex flex-row items-center gap-2">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.photoURL ? <img className='rounded-full' src={user.photoURL} />
                                : user?.displayName?.slice(0, 1)}
                        </button>
                    </div>
                    <input
                        onClick={() => setOpenModal(true)}
                        className="px-4 py-2 rounded-full border border-slate-700 w-full bg-indigo-100 "
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