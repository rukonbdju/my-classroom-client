import { useContext, useEffect, useState } from 'react'
import { ClassroomContext } from '../../context_api/ClassroomProvider/ClassroomProvider'
import useAuth from '../../hooks/Auth/useAuth'
import { Link } from 'react-router-dom'
import { handleGetMethod } from '../../utilities/handleGetMethod'
const Sidebar = () => {
    const { user } = useAuth()
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(false);

    //get classroom
    useEffect(() => {
        const getClassrooms = async (url) => {
            try {
                setLoading(true);
                const result = await handleGetMethod(url);
                setClassrooms(result?.filter(classroom => !(classroom?.archived?.find(id => id == user.uid))))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/find/${user.uid}`;
        getClassrooms(url);
    }, []);
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
                            classrooms.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer' >{classroom?.name}</li>
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
                            classrooms.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer' >{classroom?.name}</li>
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
                            classrooms.map((classroom) => <Link key={classroom?._id} to={`/classroom/${classroom?._id}`}>
                                <li className='bg-indigo-500 p-2 rounded list-none cursor-pointer' >{classroom?.name}</li>
                            </Link>)
                        }
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar