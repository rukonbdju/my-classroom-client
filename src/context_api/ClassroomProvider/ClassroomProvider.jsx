import { createContext, useReducer } from "react";
import classroomReducer from "../../reducer/classroomReducer";

const ClassroomContext=createContext()
const ClassroomProvider=({children})=>{
    const [classroom,dispatch]=useReducer(classroomReducer,initialClassroom)
return(
    <ClassroomContext.Provider value={classroom}>
        {children}
    </ClassroomContext.Provider>
)
}
export default ClassroomProvider;