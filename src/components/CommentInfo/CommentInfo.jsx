const CommentInfo = ({ comment }) => {
    return (
        <div>
            <h2 className='leading-none text-sm font-bold'>{comment?.author?.name}</h2>
            <span className=' text-xs leading-none font-thin'>{comment?.timestamps}</span>
            <p className='text-sm rounded-md break-words py-1'>
                <span className='inline-block my-2'>{comment?.content}</span>
            </p>
        </div>
    )
}
export default CommentInfo