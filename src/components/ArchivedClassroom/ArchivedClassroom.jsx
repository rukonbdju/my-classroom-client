import { useState, useEffect } from 'react';
import Classroom from '../Classroom/Classroom';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/Auth/useAuth';
import { handleGetMethod } from '../../utilities/handleGetMethod';
import Placeholder from '../Shared/Placeholder';

const ArchivedClassroom = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getClassrooms = async (url) => {
      try {
        setLoading(true);
        const result = await handleGetMethod(url);
        if (result?.length) {
          setClassrooms(result?.filter(classroom => classroom?.archived?.find(id => id == user.uid)));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const url = `http://localhost:3000/api/v1/classrooms`;
    getClassrooms(url);
  }, [user.uid]);
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row lg:flex-row gap-3 mt-6">
        <Placeholder></Placeholder>
        <Placeholder></Placeholder>
        <Placeholder></Placeholder>
      </div>
    )
  }
  return (
    <>
      {classrooms?.length ? <div className="my-12">
        <h3 className="text-2xl pb-2 border-b border-indigo-700">
          Archived Classroom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
          {classrooms?.map((classroom) => (
            <Classroom key={classroom._id} classroom={classroom}></Classroom>
          ))}
        </div>
      </div> : <></>}
    </>
  );

};

export default ArchivedClassroom;