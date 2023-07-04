import LazyLoader from "../Shared/LazyLoader"

const PostInfo = ({ post }) => {
    return (
        <>
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
            <div className='my-2 bg-indigo-300 rounded-md p-2'>
                {post?.content?.split('\n').map((text, index) => <p className='text-sm' key={index}>{text}</p>)}
                {post?.media?.url && <div className=' max-w-full my-2'>
                    <LazyLoader url={post?.media?.url}></LazyLoader>
                </div>}
            </div>
        </>
    )
}
export default PostInfo