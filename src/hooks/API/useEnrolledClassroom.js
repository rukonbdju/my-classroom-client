import { memo, useEffect, useState } from "react";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import useAuth from "../Auth/useAuth";

const useEnrolledClassroom = () => {
    const { user } = useAuth()
    const [enrolledClassroom, setEnrolledClassroom] = useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getEnrolledClassrooms = async (url) => {
            try {
                setLoading(true);
                const result = await handleGetMethod(url);
                const data={ids:result?.joined}
                console.log(data)
                if (result?.joined) {
                        const url = 'http://localhost:3000/api/v1/classrooms/joinedClassrooms'
                        const result2 = await handleGetMethod(url,data); 
                        console.log(result2)
                        setEnrolledClassroom(result2)  
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        const enrollUrl = `http://localhost:3000/api/v1/users/${user.uid}`;
        getEnrolledClassrooms(enrollUrl);
    }, []);
    return {loading,enrolledClassroom}
}
export default useEnrolledClassroom