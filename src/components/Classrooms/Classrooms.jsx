import useAuth from "../../hooks/Auth/useAuth";
import ArchivedClassroom from "../ArchivedClassroom/ArchivedClassroom";
import CreatedClassrooms from "../CreatedClassrooms/CreatedClassrooms";
import JoinedClassrooms from "../JoinedClassrooms/JoinedClassrooms";
import Navbar from "../Navbar/Navbar";

const Classrooms = () => {
    const { user } = useAuth()
    return (
        <div>
            <Navbar></Navbar>
            <div className="w-5/6 mx-auto mt-24">
                <div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold ">
                        Welcome {user?.displayName} to your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">
                            classroom
                        </span>
                    </h1>
                    <p className="mt-4">
                        Join your classroom and see your class materials, schedule and so on
                        or create a new classroom.
                    </p>
                </div>
                <CreatedClassrooms></CreatedClassrooms>
                <JoinedClassrooms></JoinedClassrooms>
                <ArchivedClassroom></ArchivedClassroom>
            </div>
        </div>
    );
}

export default Classrooms