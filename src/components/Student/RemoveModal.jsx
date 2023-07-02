const RemoveModal = ({ userId, setOpenModal }) => {
    console.log(userId)
    return (
        <div className="absolute h-screen w-screen top-0 left-0 flex items-center justify-center">
            <div className="bg-slate-100 rounded-xl p-2 w-11/12 md:w-3/5 lg:w-2/5 ">
                <div>
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