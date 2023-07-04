const Reply = ({ reply }) => {
    return (
        <div className='flex flex-row gap-2 ml-8 border border-indigo-700 my-2 p-2 rounded-md'>
            <div>
                <button className="flex  flex-row items-center font-bold justify-center
                         bg-blue-700 text-white rounded-full border-2 w-8 h-8">
                    {reply?.author?.photoURL ? <img className='rounded-full' src={reply?.author?.photoURL} />
                        : reply?.author?.name?.slice(0, 1)}
                </button>
            </div>
            <div>
                <h2 className='leading-none'>{reply?.author?.name}</h2>
                <span className=' text-xs leading-none font-thin'>{reply?.timestamps}</span>
                <p className='py-1 text-sm rounded-md break-words'>
                    <span className='inline-block'>{reply?.content}</span>
                </p>
            </div>
        </div>
    )
}
export default Reply