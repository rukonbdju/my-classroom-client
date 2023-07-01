import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import { handlePutMethod } from "../../utilities/handlePutMethod";
import Loader from "../Loader/Loader";
import Modal from "./Modal";

const CreateClassroom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [classCreationResult, setClassCreationResult] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  // create new classroom
  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // class creation data from user
      const data = {
        name: e.target.name.value,
        description: e.target.description.value,
        author: {
          id: user.uid,
          name: user.displayName,
          photoURL: user.photoURL
        },
        members: [{
          userId: user.uid,
          role: 'teacher'
        }],
        cover_photo: '',
        created_at: new Date().toString()
      }

      //create new classroom
      const url = "https://my-classroom-server.onrender.com/api/v1/classrooms";
      const postClassroomResult = await handlePostMethod(url, data);

      //update user by class id
      const id = postClassroomResult.insertedId;
      const url2 = `https://my-classroom-server.onrender.com/api/v1/users/create/${user?.uid}`;
      await handlePutMethod(url2, { id })
      setClassCreationResult(postClassroomResult);
      setLoading(false);
    } catch {
      (err) => setError(err);
    } finally {
      e.target.reset()
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 mx-auto">
        <form
          onSubmit={handleCreateClassroom}
          className="flex flex-col gap-6 items-center justify-center max-w-xl mx-auto"
        >
          <h1 className="text-5xl mb-12 text-center">Create new Classroom!</h1>
          <input
            required
            className="p-2 border-2 rounded-lg w-full"
            placeholder="Enter classroom name"
            type="text"
            name="name"
            id="name"
          />
          <input
            className="p-2 border-2 rounded-lg w-full"
            placeholder="Enter description (Optional)"
            type="text"
            name="description"
            id="description"
          />

          <button
            className="w-full font-bold rounded-lg shadow-xl mb-4
             bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-100 px-4 uppercase py-2"
            type="submit"
          >
            <div className="flex flex-row items-center justify-center">
              {loading && <Loader></Loader>}
              <span>Create Classroom</span>
            </div>
          </button>
          {error&&<span className="text-red-700">An error occur. Please try again.</span>}
          <span>
            If you are a student join classroom{" "}
            <Link
              className="text-blue-700 hover:underline"
              to={"/classroom/join"}
            >
              here
            </Link>
          </span>
        </form>
      </div>
      {classCreationResult?.classCode && <Modal classCode={classCreationResult?.classCode}></Modal>}
    </div>
  );
};

export default CreateClassroom;
