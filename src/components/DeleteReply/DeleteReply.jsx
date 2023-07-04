const DeleteReply = ()=>{
    return (
        <div className="absolute z-50  top-1 right-1">
            <button className="relative group">
                <div className="flex items-center justify-center border rounded-full cursor-pointer
                    hover:bg-indigo-400 p-1">
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
                <div className="absolute hidden group-focus-within:block right-0 w-24 bg-indigo-300 rounded">
                    <div className='border'>
                        <p className="p-1 flex hover:bg-indigo-400 ">Edit</p>
                        <hr />
                        <div className="p-1 flex flex-row items-center gap-2 hover:bg-indigo-400 ">
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}
export default DeleteReply