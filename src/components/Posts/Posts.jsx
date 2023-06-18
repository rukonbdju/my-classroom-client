import React, { useEffect, useState } from 'react';
import Post from '../Post/Post'
import { handleGetMethod } from '../../utilities/handleGetMethod';
import CreatePost from '../CreatePost/CreatePost';
import useAuth from '../../hooks/Auth/useAuth';

const Posts = ({ classroom }) => {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async (url) => {
            const result = await handleGetMethod(url)
            console.log(result)
            setPosts(result)
        }
        if (classroom._id) {
            const url = `http://localhost:3000/api/v1/posts?classId=${classroom._id}`
            getPosts(url)

        }
    }, [classroom?._id])

    return (
        <div>
            {openModal && <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-400 bg-opacity-50'>
                <CreatePost setOpenModal={setOpenModal}></CreatePost>
            </div>}

            <div>
                <div className="flex flex-row gap-2 mt-4">
                    <div>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12 ">
                            {user?.photoURL ? (
                                <img src="user?.photoURL" />
                            ) : (
                                user?.displayName?.slice(0, 1)

                            )}
                        </button>
                    </div>
                    <input
                    onClick={()=>setOpenModal(true)}
                        className="px-4 rounded-full border w-full bg-slate-300 "
                        placeholder="Start Class Discussion"
                        type="text"
                        name="post"
                        id=""
                    />
                </div>
            </div>
            {posts?.map((post) => <Post key={post._id} post={post}></Post>)}
        </div>
    );
};

export default Posts;