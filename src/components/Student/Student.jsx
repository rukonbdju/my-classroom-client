import { useEffect, useState } from "react"
import { handleGetMethod } from "../../utilities/handleGetMethod"
import RemoveModal from "./RemoveModal"
import Placeholder from "../Shared/Placeholder"

const Student = ({ student }) => {
    const [studentInfo, setStudentInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        const getStudent = async (url) => {
            try {
                setLoading(true)
                const result = await handleGetMethod(url)
                setStudentInfo(result)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        }
        const url = `http://localhost:3000/api/v1/users/${student.userId}`
        getStudent(url)
    }, [student])

    if (student.role == 'teacher') return;
    if (loading) {
        return <div className="border border-blue-300 shadow rounded-md p-4 my-2 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <div className="bg-indigo-300 p-2 my-2 rounded-md">
            {openModal && <RemoveModal userId={student.userId} setOpenModal={setOpenModal}></RemoveModal>}
            <div className="flex flex-col md:flex-row lg:flex-row  gap-2 justify-between items-center  w-full">
                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-2">
                    {studentInfo?.photoURL ? (
                        <img className='rounded-full' src={studentInfo?.photoURL} />
                    ) : (
                        <div className="p-4 font-bold rounded-full w-10 h-10 bg-blue-600 text-slate-50 flex items-center justify-center">{studentInfo?.name?.slice(0, 1)}</div>
                    )}
                    <div>
                        <h2 className="text-md font-bold">{studentInfo.name}</h2>
                        <h2>{studentInfo?.email}</h2>
                    </div>
                </div>
                <div>
                    <span onClick={() => setOpenModal(true)} className="inline-block cursor-pointer p-1 bg-red-500 hover:bg-red-700 text-white rounded-md">Remove</span>
                </div>
            </div>
        </div>
    )
}
export default Student;