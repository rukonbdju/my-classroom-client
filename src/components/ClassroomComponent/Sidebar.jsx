import { Link } from 'react-router-dom'
import useArchivedClassroom from '../../hooks/API/useArchivedClassroom'
import useCreatedClassroom from '../../hooks/API/useCreatedClassroom'
import useEnrolledClassroom from '../../hooks/API/useEnrolledClassroom'
const Sidebar = () => {
    const {archivedClassroomLoading,archivedClassroom}=useArchivedClassroom()
    const {loadingCreatedClassrooms,createdClassrooms}=useCreatedClassroom()
    const{loadingEnrolledClassroom,enrolledClassroom}=useEnrolledClassroom()
    return (
        <aside className='rounded-lg hidden md:block lg:block mt-16 h-[calc(100vh-64px)] w-80 bg-indigo-200 overflow-auto sticky left-0 top-16'>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Enrolled</h2>
                    {
                        loadingEnrolledClassroom?<div className='w-full h-8 rounded animate-pulse bg-indigo-500'></div>:<div className='flex flex-col gap-2'>
                        {
                            enrolledClassroom?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer active:scale-90 transition-all' >{classroom?.name}</li>
                            </Link>)
                            
                        }
                    </div>
                    }
                    
                </div>
            </div>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Created</h2>
                    {loadingCreatedClassrooms?<div className='w-full h-8 rounded animate-pulse bg-indigo-500'></div>:<div className='flex flex-col gap-2'>
                        {
                            createdClassrooms?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer active:scale-90 transition-all' >{classroom?.name}</li>
                            </Link>)
                        }
                    </div>}
                    
                </div>
            </div>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Archived</h2>
                    {archivedClassroomLoading?<div className='w-full h-8 rounded animate-pulse bg-indigo-500'></div>:<div className='flex flex-col gap-2'>
                        {
                            archivedClassroom?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer active:scale-90 transition-all' >{classroom?.name}</li>
                            </Link>)
                        }
                    </div>}
                    
                </div>
            </div>
        </aside>
    )
}
export default Sidebar