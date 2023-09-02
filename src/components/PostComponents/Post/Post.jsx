import { useEffect, useState } from 'react';
import CommentBox from '../../CommentBox/CommentBox';
import DeletePost from '../../DeletePost/DeletePost';
import UpdateLike from '../../Updatelike/UpdateLike';
import PostInfo from '../../PostInfo/PostInfo';
import useAuth from '../../../hooks/Auth/useAuth';

const Post = ({ post }) => {
    const { user } = useAuth()
    const [openComment, setOpenComment] = useState(false)
    const [commentCount, setCommentCount] = useState(post?.comments?.length)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post?.likes?.length?post?.likes?.length:0)
    useEffect(() => {
        for (let i = 0; i < post?.likes?.length; i++) {
            const id = post?.likes[i];
            if (post?.likes[i] == user?.uid) {
                setIsLiked(true)
            }
        }
    }, [post])

    return (
        <div className='border relative p-2 rounded-md my-8 bg-indigo-100'>
            <DeletePost post={post} ></DeletePost>
            <div className=''>
                <PostInfo post={post}></PostInfo>
                <div className='flex flex-row gap-2'>
                    <span className='text-sm'>{likeCount} Likes</span>
                    <span
                        onClick={() => setOpenComment(!openComment)}
                        className='text-sm cursor-pointer hover:underline'>{commentCount} Comments</span>
                </div>
                <div className='flex flex-row justify-end gap-2 items-center'>
                    <UpdateLike
                        isLiked={isLiked}
                        setIsLiked={setIsLiked}
                        setLikeCount={setLikeCount}
                        postId={post?._id}>
                    </UpdateLike>
                    <button
                        onClick={() => setOpenComment(!openComment)}
                        className='flex flex-row gap-1 rounded-lg p-1 items-center justify-center  bg-indigo-400 hover:bg-indigo-500'>
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