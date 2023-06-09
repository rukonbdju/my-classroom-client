import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import bg from "../../assets/bg/gradient-bg.png"

const CreateClassroom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [classCreationResult, setClassCreationResult] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description= e.target.description.value;
    const email = user.email;
    const creator = user.displayName;
    const uid = user.uid;
    const formData = { name, email, description, uid, creator };
    console.log(formData)
    const url = "http://localhost:3000/classrooms";
    try {
      setLoading(true);
      const result = await handlePostMethod(url, formData);
      setClassCreationResult(result);
      console.log(result)
    } catch {
      (err) => setError(err);
    } finally {
      setLoading(false);
      e.target.reset()
    }
  };
  const handleCloseModal = () => {
    setModalActive(false);
    navigate("/classroom");
  };
  console.log(classCreationResult);
  return (
    <div style={{backgroundImage:`url(${bg})`}} className="w-screen h-screen flex items-center justify-center bg-cover">
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
             bg-gradient-to-r from-violet-500 to-fuchsia-500 text-slate-100 px-4 uppercase py-2"
          type="submit"
        >
          Create Classroom
        </button>
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
      {classCreationResult?.classCode && (
        <div className="absolute h-screen w-screen bg-slate-700 bg-opacity-50 top-0 left-0 flex items-center justify-center">
          <div className="bg-slate-100 rounded-xl p-6 ">
            <div>
              <p className="text-right mb-2">
                <span
                  onClick={() => handleCloseModal()}
                  className="p-2 bg-slate-500 rounded-xl text-slate-50 font-bold cursor-pointer hover:bg-slate-700"
                >
                  Close
                </span>
              </p>
              <h1 className="text-2xl">
                Your classroom is Successfully created!
              </h1>
              <div className="my-2">
                <p>
                  Your classroom code is{" "}
                  <span className="text-blue-500 underline">
                    {classCreationResult?.classCode}
                  </span>{" "}
                </p>
              </div>
              <p className="bg-slate-400 p-2 rounded-md">
                Share with your students
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateClassroom;
