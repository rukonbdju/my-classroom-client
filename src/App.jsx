import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../src/components/Login/Login";
import Register from "../src/components/Register/Register";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import CreateClassroom from "./components/CreateClassroom/CreateClassroom";
import JoinClassroom from "./components/JoinClassroom/JoinClassroom";
import NotFound from "./components/NotFound/NotFound";
import LandingPage from "./components/LandingPage/LandingPage";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ClassroomLayout from "./layouts/ClassroomLayout/ClassroomLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Students from "./components/Students/Students";
import Classrooms from "./components/Classrooms/Classrooms";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/classrooms" element={<AuthRoute><Classrooms></Classrooms></AuthRoute>} />
        <Route path="/classroom/create" element={<AuthRoute><CreateClassroom></CreateClassroom></AuthRoute>} />
        <Route path="/classroom/join" element={<AuthRoute><JoinClassroom></JoinClassroom></AuthRoute>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/reset_password" element={<ResetPassword></ResetPassword>} />
        <Route path='/classroom' element={<AuthRoute><MainLayout></MainLayout></AuthRoute>}>
          <Route path=":id"  element={<ClassroomLayout></ClassroomLayout>}></Route>
        </Route>
        <Route path='/classroom/:id/students' element={<AuthRoute><Students></Students></AuthRoute>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
}

export default App;
