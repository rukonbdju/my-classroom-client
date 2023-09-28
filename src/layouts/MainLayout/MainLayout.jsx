/* import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetMethod } from "../../utilities/handleGetMethod";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/Auth/useAuth";
import Posts from "../../components/Posts/Posts";
import LeaveModal from "../../components/LeaveModal/LeaveModal";
import ArchiveClassroom from "../../components/ArchiveClassroom/ArchiveClassroom";
import Placeholder from "./Placeholder";
import PostLayout from "../PostLayout/PostLayout"; */

import ClassrooomInfo from "../../components/ClassroomComponent/ClassroomInfo";
import ClassroomProvider from "../../context_api/ClassroomProvider/ClassroomProvider";
import CommentProvider from "../../context_api/CommentProvider/CommentProvider";
import PostProvider from "../../context_api/PostProvider/PostProvider";


const MainLayout = () => {
  return (
  <ClassroomProvider>
    <PostProvider>
      <CommentProvider>
        <ClassrooomInfo/>
      </CommentProvider>
    </PostProvider>
  </ClassroomProvider>
 )

};

export default MainLayout;
