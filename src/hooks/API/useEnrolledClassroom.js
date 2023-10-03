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
                if (result?.joined) {
                        const url = 'https://my-classroom-server.onrender.com/api/v1/classrooms/joinedClassrooms'
                        const result2 = await handleGetMethod(url,data); 
                        setEnrolledClassroom(result2)  
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        const enrollUrl = `https://my-classroom-server.onrender.com/api/v1/users/${user.uid}`;
        getEnrolledClassrooms(enrollUrl);
    }, []);
    return {loading,enrolledClassroom}
}
export default useEnrolledClassroom