const CommentInfo = ({ comment }) => {
    return (
        <div className='flex flex-row gap-2 '>
            <div>
                <button className="flex  flex-row items-center font-bold justify-center
                         bg-blue-700 text-white rounded-full border-2 w-8 h-8">
                    {comment?.author?.photoURL ? <img className='rounded-full' src={comment?.author?.photoURL} />
                        : comment?.author?.name?.slice(0, 1)}
                </button>
            </div>
            <div>
                <h2 className='leading-none'>{comment?.author?.name}</h2>
                <span className=' text-xs leading-none font-thin'>{comment?.timestamps}</span>
                <p className='text-sm rounded-md break-words py-1'>
                    <span className='inline-block'>{comment?.content}</span>
                </p>
            </div>
        </div>
    )
}
export default CommentInfo