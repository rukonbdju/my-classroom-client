import { useEffect, useState } from "react";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import useAuth from "../Auth/useAuth";

const useCreatedClassroom=()=>{
    const { user } = useAuth();
    const [createdClassrooms, setCreatedClassrooms] = useState([]);
    const [loadingCreatedClassrooms, setLoadingCreatedClassrooms] = useState(false);
  
    //get classroom
    useEffect(() => {
      const getClassrooms = async (url) => {
        try {
          setLoadingCreatedClassrooms(true);
          const result = await handleGetMethod(url);
          setCreatedClassrooms(result?.filter(classroom => !(classroom?.archived?.find(id => id == user.uid))))
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingCreatedClassrooms(false);
        }
      };
      const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/find/${user.uid}`;
      getClassrooms(url);
    }, []);
    return {loadingCreatedClassrooms,createdClassrooms}
}
export default useCreatedClassroom;