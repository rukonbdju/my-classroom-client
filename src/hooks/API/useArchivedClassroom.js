import { useEffect, useState } from "react";
import useAuth from "../Auth/useAuth";
import { handleGetMethod } from "../../utilities/handleGetMethod";

const useArchivedClassroom = () => {
    const { user } = useAuth();
    const [archivedClassroom, setArchivedClassroom] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getClassrooms = async (url) => {
            try {
                setLoading(true);
                const result = await handleGetMethod(url);
                if (result?.length) {
                    setArchivedClassroom(result?.filter(classroom => classroom?.archived?.find(id => id == user.uid)));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        const url = `https://my-classroom-server.onrender.com/api/v1/classrooms`;
        getClassrooms(url);
    }, [])

    return { loading, archivedClassroom };
}
export default useArchivedClassroom;