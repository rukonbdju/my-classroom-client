import { Link } from 'react-router-dom'
import useArchivedClassroom from '../../hooks/API/useArchivedClassroom'
import useCreatedClassroom from '../../hooks/API/useCreatedClassroom'
import useEnrolledClassroom from '../../hooks/API/useEnrolledClassroom'
const Sidebar = () => {
    const {archivedClassroom}=useArchivedClassroom()
    const {createdClassrooms}=useCreatedClassroom()
    const{loading,enrolledClassroom}=useEnrolledClassroom()
    if (loading) {
        return <div className='w-8 h-3 animate-ping'></div>
    }
    return (
        <aside className='rounded-lg hidden md:block lg:block mt-16 h-[calc(100vh-64px)] w-64 bg-indigo-200 overflow-auto sticky left-0 top-16'>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Enrolled</h2>
                    <div className='flex flex-col gap-2'>
                        {
                            enrolledClassroom?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer active:scale-90 transition-all' >{classroom?.name}</li>
                            </Link>)
                        }
                    </div>
                </div>
            </div>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Created</h2>
                    <div className='flex flex-col gap-2'>
                        {
                            createdClassrooms?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer active:scale-90 transition-all' >{classroom?.name}</li>
                            </Link>)
                        }
                    </div>
                </div>
            </div>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Archived</h2>
                    <div className='flex flex-col gap-2'>
                        {
                            archivedClassroom?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer active:scale-90 transition-all' >{classroom?.name}</li>
                            </Link>)
                        }
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar