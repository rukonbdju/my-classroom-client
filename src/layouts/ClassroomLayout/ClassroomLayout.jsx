import React from 'react';
import MainLayout from '../MainLayout/MainLayout';

const ClassroomLayout = () => {
    return (
        <ClassroomProvider>
            <MainLayout></MainLayout>
        </ClassroomProvider>
    );
};

export default ClassroomLayout;