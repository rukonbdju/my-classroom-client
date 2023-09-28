import { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { ClassroomContext } from '../../context_api/ClassroomProvider/ClassroomProvider'
import useAuth from '../../hooks/Auth/useAuth'
import { Link } from 'react-router-dom'
import PostLayout from '../../layouts/PostLayout/PostLayout'
const ClassrooomInfo = () => {
    const {user}=useAuth()
    const {isLoading,classroom,dispatch}=useContext(ClassroomContext)
    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="w-11/12 md:w-3/5  lg:w-3/5 mx-auto mt-20">
                <div>
                    <div className="p-5 rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-sky-500 relative">
                        <div className="absolute top-1 right-1">
                            <button className="relative group">
                                <div className="flex items-center justify-center border rounded-full cursor-pointer
               hover:bg-slate-300 p-1">
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
                                <div className="absolute hidden group-focus-within:block right-0 w-24  bg-indigo-400 rounded">
                                    <div className='border'>
                                        {classroom?.author?.id == user.uid ?
                                            <div>
                                                <p className="p-1 hover:bg-slate-300 ">Edit</p>
                                                <hr />
                                                <p className="p-1 hover:bg-slate-300 ">Archive</p>
                                                <hr />
                                                <p className="p-1 hover:bg-slate-300 ">Code: <span className="text-red-500">{classroom.code}</span></p>
                                            </div>

                                            : <div>
                                                <p className="p-1 hover:bg-slate-300 ">Leave</p>
                                            </div>}
                                    </div>
                                </div>
                            </button>
                        </div>
                        <h1 className="text-3xl">{classroom?.name}</h1>
                        <p className="font-bold">Teacher: {classroom?.author?.name}</p>
                        <p className="my-1">{classroom?.description}</p>
                        <Link to={`/classroom/${classroom?._id}/students`}>
                            <p className="hover:underline ">{classroom?.members?.length - 1} Students</p>
                        </Link>
                    </div>
                </div>
                {classroom?.name && <PostLayout></PostLayout>}
            </div>
        </div>
    )
}
export default ClassrooomInfo