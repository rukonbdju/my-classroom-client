import LazyLoader from "../Shared/LazyLoader"

const PostInfo = ({ post }) => {
    return (
        <>
            <div className='flex flex-row gap-2'>
                <div>
                    <h3 className="text xl font-bold">{post?.author?.name}</h3>
                    <span className='text-xs'>{post?.timestamps}</span>
                </div>
            </div>
            <div className='my-2'>
                {post?.content?.split('\n').map((text, index) => <p className='text-sm' key={index}>{text}</p>)}
                {post?.media?.url && <div className="flex justify-center bg-indigo-100 rounded-md">
                    <div className='max-h-full max-w-md'>
                        <LazyLoader url={post?.media?.url}></LazyLoader>
                    </div>
                </div>}
            </div>
        </>
    )
}
export default PostInfo