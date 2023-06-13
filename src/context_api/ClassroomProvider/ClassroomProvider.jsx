import React, { createContext } from 'react';
import useManageClassroom from '../../hooks/ManageClassroom/useManageClassroom';

export const ClassroomContext=createContext()

const ClassroomProvider = ({children}) => {
    const classroomInfo=useManageClassroom();
    return (
        <ClassroomContext.Provider value={classroomInfo}>
            {children}
        </ClassroomContext.Provider>
    );
};

export default ClassroomProvider;