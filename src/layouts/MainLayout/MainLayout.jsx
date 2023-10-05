
import { Link, Outlet } from "react-router-dom";
import ClassroomProvider from "../../context_api/ClassroomProvider/ClassroomProvider";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/ClassroomComponent/Sidebar/Sidebar";
import RightSidebar from "../../components/ClassroomComponent/RightSidebar/RightSidebar";


const MainLayout = () => {
  return (
    <ClassroomProvider>
      <div>
        <Navbar></Navbar>
        <div className='flex flex-row gap-4 '>
          <Sidebar></Sidebar>
          <Outlet></Outlet>
          <RightSidebar></RightSidebar>
        </div>
      </div>
    </ClassroomProvider>
  )
};

export default MainLayout;
