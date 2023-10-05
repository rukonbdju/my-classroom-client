import ClassroomInfo from '../ClassroomComponent/ClassroomInfo/ClassroomInfo';
import Placeholder from '../Shared/Placeholder';
import { Link } from 'react-router-dom';
import useEnrolledClassroom from '../../hooks/API/useEnrolledClassroom';

const JoinedClassrooms = () => {
    const {loading,enrolledClassroom}=useEnrolledClassroom()
    return (
        <div>
            <h3 className="text-2xl pb-2 border-b border-indigo-700">
                Enrolled Classroom
            </h3>
            {loading ? <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
                <Placeholder></Placeholder>
                <Placeholder></Placeholder>
                <Placeholder></Placeholder>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                {enrolledClassroom?.map((classroom) => <ClassroomInfo key={classroom._id} classroom={classroom}></ClassroomInfo>)}
                <Link to={"/classroom/join"}>
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-6 rounded-lg shadow-md cursor-pointer text-center">
                        <span className="text-5xl font-bold">+</span>
                        <p className="font-bold">Join Classroom</p>
                    </div>
                </Link>
            </div>}
        </div>
    );
};

export default JoinedClassrooms;