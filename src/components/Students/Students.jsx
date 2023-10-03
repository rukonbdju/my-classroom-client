import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Student from "../Student/Student";
import Placeholder from "../../layouts/MainLayout/Placeholder";

const Students = () => {
    const { id } = useParams()
    const [classroom, setClassroom] = useState({})
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        //get classroom by id
        const getClassroom = async (url) => {
            try {
                setLoading(true)
                const result = await handleGetMethod(url);
                setClassroom(result);
                setStudents(result.members)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        const url = `http://localhost:3000/api/v1/classrooms/${id}`;
        getClassroom(url)
    }, [id])
    if (loading) {
        return (
            <>
                <Navbar></Navbar>
                <Placeholder></Placeholder>
            </>
        )
    }

    return (
        <>
            <Navbar></Navbar>
            <div className=" w-11/12 md:w-5/6  lg:w-2/3 mx-auto mt-20">
                <div className="p-5 rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-sky-500 relative">
                    <h1 className="text-3xl">{classroom?.name}</h1>
                    <p className="font-bold">Teacher: {classroom?.author?.name}</p>
                    <p className="my-1">{classroom?.description}</p>
                </div>
                {students?.map(student => <Student key={student.userId} student={student}></Student>)}

            </div>
        </>
    )
}
export default Students;