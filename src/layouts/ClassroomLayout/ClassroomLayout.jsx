import React from 'react';
import ClassroomProvider from '../../context_api/ClassroomProvider/ClassroomProvider';
import MainLayout from '../MainLayout/MainLayout';

const ClassroomLayout = () => {
    return (
        <ClassroomProvider>
            <MainLayout></MainLayout>
        </ClassroomProvider>
    );
};

export default ClassroomLayout;