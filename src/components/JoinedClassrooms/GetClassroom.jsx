import { useEffect, useState } from "react";
import Classroom from "../Classroom/Classroom";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Placeholder from "../Shared/Placeholder";

const GetClassroom = ({ id }) => {
    const [classroom, setClassroom] = useState({})
    const [loading, setLoading] = useState(false)
    const getClassroom = async (id) => {
        try {
            setLoading(true)
            const url = `http://localhost:3000/api/v1/classrooms/${id}`
            const result = await handleGetMethod(url);
            setClassroom(result)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClassroom(id)
    }, [])
    return (
        <>
            {
                loading ? <Placeholder></Placeholder> : <Classroom classroom={classroom}></Classroom>
            }
        </>
    )
}
export default GetClassroom;