import { createContext, useEffect, useReducer, useState } from "react";
import ClassroomReducer from "../../reducer/ClassroomReducer/ClassroomReducer";
import { useParams } from "react-router-dom";
import { handleGetMethod } from "../../utilities/handleGetMethod";

export const ClassroomContext = createContext()

const ClassroomProvider = ({ children }) => {
    const params=useParams()
    const [isLoading,setIsLoading]=useState(false)
    const [classroom, dispatch] = useReducer(ClassroomReducer, null)
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const result = await handleGetMethod(url)
                dispatch({ type: 'initialState', payload: result })
            } catch (error) {
                console.log(error)
            }
            finally{
                setIsLoading(false)
            }
        }
        const url = `https://my-classroom-server.onrender.com/api/v1/classrooms/${params.id}`;
        getData()
    }, [params])

    return (
        <ClassroomContext.Provider value={{isLoading, classroom, dispatch }}>
            {children}
        </ClassroomContext.Provider>
    )
}
export default ClassroomProvider;