import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const ClassroomLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>

        </>
    );
};

export default ClassroomLayout;