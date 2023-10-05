import Placeholder from '../Shared/Placeholder';
import useArchivedClassroom from '../../hooks/API/useArchivedClassroom';
import ClassroomInfo from '../ClassroomComponent/ClassroomInfo/ClassroomInfo';

const ArchivedClassroom = () => {
  // using a custom hook which gives all archived classroom by call api
  const { loading, archivedClassroom } = useArchivedClassroom()
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
    <div className='mb-8'>
      <h3 className="text-2xl pb-2 border-b border-indigo-700">
        Archived Classroom
      </h3>
      {archivedClassroom?.length ? <div className="my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-6 my-6">
          {archivedClassroom?.map((classroom) => (
            <ClassroomInfo key={classroom._id} classroom={classroom}></ClassroomInfo>
          ))}
        </div>
      </div> : <p>No classroom found.</p>}
    </div>
  );
};

export default ArchivedClassroom;