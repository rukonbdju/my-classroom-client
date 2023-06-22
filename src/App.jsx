import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home/Home";
import Login from "../src/components/Login/Login";
import Register from "../src/components/Register/Register";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import CreateClassroom from "./components/CreateClassroom/CreateClassroom";
import JoinClassroom from "./components/JoinClassroom/JoinClassroom";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import NotFound from "./components/NotFound/NotFound";
import LandingPage from "./components/LandingPage/LandingPage";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LandingPage></LandingPage>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/classroom"
          element={<AuthRoute><HomeLayout></HomeLayout></AuthRoute>}>
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
        <Route path="*" element={<NotFound></NotFound>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
