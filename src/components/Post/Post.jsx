import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import CommentBox from '../CommentBox/CommentBox';
import { handlePutMethod } from '../../utilities/handlePutMethod';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import handleDeleteMethod from '../../utilities/handleDeleteMethod';
import Placeholder from './Placeholder';
import Loader from '../Loader/Loader';
import LazyLoader from '../Shared/LazyLoader';

const Post = ({ post, setPosts }) => {
    const { user } = useAuth()
    const [openComment, setOpenComment] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post?.likes?.length)
    const [commentCount, setCommentCount] = useState(post?.comments?.length)
    const [isDelete, setIsDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageLoad, setImageLoad] = useState(true)
    console.log(imageLoad)

    //handle delete and update likes
    const handleUpdateLike = async (status) => {
        if (status == 'true') {
            setIsLiked(true)
            setLikeCount((prevCount) => prevCount + 1)
        }
        else {
            setIsLiked(false)
            setLikeCount((prevCount) => prevCount - 1)
        }
        const url = `https://my-classroom-server.onrender.com/api/v1/posts/like/${post._id}`;
        const data = {
            userId: user.uid,
            like: status
        }
        await handlePutMethod(url, data)

    }

    const handleDeletePost = async () => {
        setLoading(true)
        const url = `https://my-classroom-server.onrender.com/api/v1/posts?id=${post._id}&classId=${post.classId}`
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id))
        await handleDeleteMethod(url)
        setLoading(false)
    }

    useEffect(() => {
        for (let i = 0; i < post?.likes?.length; i++) {
            const id = post?.likes[i];
            if (post?.likes[i] == user?.uid) {
                setIsLiked(true)
            }
        }
    }, [post])

    return (
        <div className='border relative p-2 rounded-md my-4 bg-slate-100'>
            <div className="absolute  top-1 right-1">
                <button className="relative group">
                    <div className="flex items-center justify-center border rounded-full cursor-pointer
               hover:bg-slate-400 p-1">
                        <svg
                            className="block"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </div>
                    {post?.author?.id == user.uid ? <div className="absolute hidden group-focus-within:block right-0 w-24 bg-slate-400 rounded">
                        <div className='border'>
                            <p className="p-1 flex hover:bg-slate-300 ">Edit</p>
                            <hr />
                            <p onClick={() => handleDeletePost()} className="p-1 flex flex-row items-center gap-2 hover:bg-slate-300 ">
                                {loading && <Loader></Loader>}<span>Delete</span>
                            </p>
                        </div>
                    </div> : <></>}
                </button>
            </div>
            <div className=''>
                <div className='flex flex-row gap-2'>
                    <div className=''>
                        <button
                            className="flex  flex-row items-center font-bold justify-center bg-blue-700 text-white rounded-full border-2 w-12 h-12"
                        >
                            {post?.author?.photoURL ? (
                                <img className='rounded-full' src={post?.author?.photoURL} />
                            ) : (
                                post?.author?.name?.slice(0, 1)
                            )}
                        </button>
                    </div>
                    <div>
                        <h3 className="text xl font-bold">{post?.author?.name}</h3>
                        <span className='text-xs'>{post?.timestamps}</span>
                    </div>
                </div>
                <div className='my-2 bg-slate-200 rounded-md p-2'>
                    {post?.content?.split('\n').map((text, index) => <p className='text-sm' key={index}>{text}</p>)}
                    {post?.media?.url && <div className=' max-w-full my-2'>
                        <LazyLoader url={post?.media?.url}></LazyLoader>
                    </div>}
                </div>
                <div className='flex flex-row gap-2'>
                    <span className='text-sm'>{likeCount} Likes</span>
                    <span
                        onClick={() => setOpenComment(!openComment)}
                        className='text-sm cursor-pointer hover:underline'>{commentCount} Comments</span>
                </div>
                <div className='flex flex-row justify-end gap-2 items-center'>
                    {
                        (isLiked) ? <button onClick={() => handleUpdateLike('false')} className='flex flex-row gap-1 rounded-lg p-2 items-center justify-center  bg-slate-200'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                            </svg>

                            <span className='hidden md:inline lg:inline'>dislike</span>
                        </button> : <button onClick={() => handleUpdateLike('true')} className='flex flex-row gap-1 rounded-lg p-2 items-center justify-center  bg-slate-200'>
                            <svg
                                className='inline'
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                            </svg>
                            <span className='hidden md:inline lg:inline'>like</span>
                        </button>
                    }

                    <button onClick={() => setOpenComment(!openComment)} className='flex flex-row gap-1 rounded-lg p-2 items-center justify-center  bg-slate-200'>

                        <svg
                            className='inline'
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                        </svg>
                        <span className='hidden md:inline lg:inline'>comments</span>
                    </button>
                    <button className='flex flex-row gap-1 rounded-lg p-2 items-center justify-center  bg-slate-200'>
                        <svg
                            className='inline'
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                        <span className='hidden md:inline lg:inline'>message</span>
                    </button>
                </div>
                <div className=''>
                    {openComment && <CommentBox
                        setCommentCount={setCommentCount}
                        postId={post?._id}
                        setOpenComment={setOpenComment}>
                    </CommentBox>}
                </div>
            </div>



        </div>
    );
};

export default Post;