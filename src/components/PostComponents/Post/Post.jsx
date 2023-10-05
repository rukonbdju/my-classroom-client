import { useContext, useEffect, useReducer, useState } from 'react';
import CommentBox from '../../CommentBox/CommentBox';
import DeletePost from '../../DeletePost/DeletePost';
import UpdateLike from '../../Updatelike/UpdateLike';
import PostInfo from '../../PostInfo/PostInfo';
import { handleGetMethod } from '../../../utilities/handleGetMethod';
import Placeholder from '../Posts/Placeholder';
import { PostContext } from '../../../context_api/PostProvider/PostProvider';
import CommentLayout from '../../../layouts/CommentLayout/CommentLayout';

const Post = () => {
    const { loading, post } = useContext(PostContext)
    const [openComment, setOpenComment] = useState(false)
    if (loading) {
        return <Placeholder></Placeholder>
    }

    return (
        <div className='border border-indigo-500 relative p-2 rounded-md my-8'>
            <DeletePost post={post} ></DeletePost>
            <div className='flex flex-row gap-4 '>
                <div>
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
                <div className='w-full '>
                    <PostInfo post={post}></PostInfo>
                    <div className='flex flex-row justify-between items-end'>
                        <div className='flex flex-row  gap-2'>
                            <span className='text-xs'>{post?.likes?.length} Likes</span>
                            <span
                                onClick={() => setOpenComment(!openComment)}
                                className='text-xs cursor-pointer hover:underline'>{post?.comments?.length} Comments</span>
                        </div>
                        <div className='flex flex-row justify-end gap-2 items-center'>
                            <UpdateLike></UpdateLike>
                            <button
                                onClick={() => setOpenComment(!openComment)}
                                className='p-2 rounded-lg bg-indigo-300'>
                                <svg
                                    className=''
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {
                        openComment && <CommentLayout></CommentLayout>
                    }
                </div>
            </div>
        </div>
    );
};

export default Post;