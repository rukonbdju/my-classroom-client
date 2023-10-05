const RightSidebar = () => {
    return (
        <aside className='rounded-lg hidden md:hidden lg:block  mt-16 my-1 h-[calc(100vh-64px)] w-80 bg-indigo-200 overflow-auto sticky left-0 top-16'>
            <div className='p-4'>
                <div>
                    <h2 className='text-xl font-bold'>Class Metarials</h2>
                    <div className='flex flex-col gap-2'>
                        <h1 className=''>Class metarials will aprear here</h1>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>Students</h2>
                    <div className='flex flex-col gap-2'>
                        <h1 className=''>Students list will apear here</h1>
                    </div>
                </div>

            </div>
        </aside>
    )
}
export default RightSidebar