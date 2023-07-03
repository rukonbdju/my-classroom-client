const RemoveModal = ({ userId, setOpenModal }) => {
    return (
        <div className="absolute h-screen bg-indigo-200 bg-opacity-50 w-screen top-0 left-0 flex items-center justify-center">
            <div className="bg-indigo-400 rounded-md p-2 w-11/12 md:w-3/5 lg:w-2/5 ">
                <p>Are you sure to remove this student?</p>
                <div className="flex flex-row justify-end items-center gap-2 mt-2">
                    <p
                        onClick={() => setOpenModal(false)}
                        className="text-right  cursor-pointer">
                        <span className=" bg-red-500  hover:bg-red-700 p-1 inline-block rounded-md text-slate-50 font-bold" >Confirm</span>
                    </p>
                    <p
                        onClick={() => setOpenModal(false)}
                        className="text-right  cursor-pointer">
                        <span className=" bg-red-500  hover:bg-red-700 p-1 inline-block rounded-md text-slate-50 font-bold" >Close</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default RemoveModal