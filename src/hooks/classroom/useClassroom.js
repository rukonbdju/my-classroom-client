import React, { useContext } from 'react';
import { ClassroomContext } from '../../context_api/ClassroomProvider/ClassroomProvider';

const useClassroom = () => {
    const classroomInfo=useContext(ClassroomContext)
    return classroomInfo;
};

export default useClassroom;