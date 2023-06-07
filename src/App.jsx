import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home/Home";
import Login from "../src/components/Login/Login";
import Register from "../src/components/Register/Register";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import CreateClassroom from "./components/CreateClassroom/CreateClassroom";
import JoinClassroom from "./components/JoinClassroom/JoinClassroom";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar></Navbar>}/>
        <Route path="/classroom" element={<AuthRoute><HomeLayout></HomeLayout></AuthRoute>}>
        <Route index element={<Home></Home>}></Route>
          <Route path="create" element={<CreateClassroom></CreateClassroom>}></Route>
          <Route path="join" element={<JoinClassroom></JoinClassroom>}></Route> 
        </Route>
        <Route path="/login" element={<Login></Login>}> </Route>
        <Route path="/register" element={<Register></Register>}></Route>
        
      </Routes>
    </>
  );
}

export default App;
