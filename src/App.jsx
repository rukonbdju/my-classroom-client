import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home/Home";
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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route
          path="/classroom"
          element={<AuthRoute><ClassroomLayout></ClassroomLayout></AuthRoute>}>
          <Route
            index
            element={<Home></Home>}></Route>
          <Route
            path="create"
            element={<CreateClassroom></CreateClassroom>}>
          </Route>
          <Route
            path="join"
            element={<JoinClassroom></JoinClassroom>}>
          </Route>
        </Route>
        <Route
          path="/login"
          element={<Login></Login>}>
        </Route>
        <Route
          path="/register"
          element={<Register></Register>}>
        </Route>
        <Route
          path="/reset_password"
          element={<ResetPassword></ResetPassword>}>
        </Route>
        <Route
          path='/classroom/:id'
          element={<AuthRoute><MainLayout></MainLayout></AuthRoute>}>
        </Route>
        <Route
          path='/classroom/:id/students'
          element={<AuthRoute><Students></Students></AuthRoute>}>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
