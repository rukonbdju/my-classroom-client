import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import useAuth from '../../hooks/Auth/useAuth';

const ClassroomLayout = memo(() => {
    const {user}=useAuth()
    console.log(user)
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
});

export default ClassroomLayout;