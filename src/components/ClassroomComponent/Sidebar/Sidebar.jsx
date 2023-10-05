import { Link } from 'react-router-dom'
import useArchivedClassroom from '../../../hooks/API/useArchivedClassroom'
import useCreatedClassroom from '../../../hooks/API/useCreatedClassroom'
import useEnrolledClassroom from '../../../hooks/API/useEnrolledClassroom'

const Sidebar = () => {

    return (
        <aside className='rounded-lg hidden md:block lg:block mt-16 h-[calc(100vh-64px)] w-80 bg-indigo-100 overflow-auto sticky left-0 top-16'>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Enrolled</h2>
                    <EnrolledClassrooms></EnrolledClassrooms>
                </div>
            </div>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Created</h2>
                    <CreatedClassrooms></CreatedClassrooms>
                </div>
            </div>
            <div className='p-4 '>
                <div>
                    <h2 className='text-xl font-bold'>Archived</h2>
                    <ArchivedClassrooms></ArchivedClassrooms>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar

const CreatedClassrooms = () => {
    const { loadingCreatedClassrooms, createdClassrooms } = useCreatedClassroom()
    if (loadingCreatedClassrooms) {
        return <div className='w-full h-8 rounded animate-pulse bg-indigo-500'></div>
    }
    else if (createdClassrooms?.length == 0) {
        return <p className='p-2 bg-indigo-200 rounded'>No classroom found</p>
    }
    return (
        <div className='flex flex-col gap-1'>

            {
                createdClassrooms?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                    <li className='bg-indigo-200 hover:bg-indigo-300 p-2 rounded list-none cursor-pointer active:scale-90 active:bg-indigo-500 transition-all' >{classroom?.name}</li>
                </Link>)
            }
        </div>
    )
}
const ArchivedClassrooms = () => {
    const { archivedClassroomLoading, archivedClassroom } = useArchivedClassroom()
    if (archivedClassroomLoading) {
        return <div className='w-full h-8 rounded animate-pulse bg-indigo-500'></div>
    }
    else if (archivedClassroom?.length == 0) {
        return <p className='p-2 bg-indigo-200 rounded'>No classroom found</p>
    }
    return (
        <div className='flex flex-col gap-1'>

            {
                archivedClassroom?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                    <li className='bg-indigo-200 hover:bg-indigo-300 p-2 rounded list-none cursor-pointer active:scale-90 active:bg-indigo-500 transition-all' >{classroom?.name}</li>
                </Link>)
            }
        </div>
    )
}
const EnrolledClassrooms = () => {
    const { loadingEnrolledClassroom, enrolledClassroom } = useEnrolledClassroom()
    if (loadingEnrolledClassroom) {
        return <div className='w-full h-8 rounded animate-pulse bg-indigo-500'></div>
    }
    else if (enrolledClassroom?.length == 0) {
        return <p className='p-2 bg-indigo-200 rounded'>No classroom found</p>
    }
    return (
        <div className='flex flex-col gap-1'>
            {
                enrolledClassroom?.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                    <li className='bg-indigo-200 hover:bg-indigo-300 p-2 rounded list-none cursor-pointer active:scale-90 active:bg-indigo-500 transition-all' >{classroom?.name}</li>
                </Link>)
            }
        </div>
    )
}