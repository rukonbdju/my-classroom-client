import React, { useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import { handlePutMethod } from "../../utilities/handlePutMethod";

const CreatePost = ({ classroom, setOpenModal }) => {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false)

  const getPostContent = (e) => {
    e.preventDefault();
    setPostContent(e.target.value);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        author: user.uid,
        classId: classroom._id,
        content: postContent,
        likes: [],
        comments: [],
        timestamps: new Date().toString()
      }
      const postUrl = "http://localhost:3000/api/v1/posts"
      const result = await handlePostMethod(postUrl, data)
      const postId = result.insertedId;

      const classroomUrl = `http://localhost:3000/api/v1/classrooms/${classroom._id}`
      const addRefToClass = await handlePutMethod(classroomUrl, { postId })
      setPostResult(addRefToClass)
    } catch {
      error => console.log(error)
    } finally {
      setLoading(false)
      setPostResult(true)
      setModalOpen(false)
    }
  };
  return (

    <form onSubmit={handleCreatePost} className="w-11/12 md:w-3/4 lg:w-1/2 bg-slate-50 p-4 rounded-lg" >
      <h1 className="text-xl md:text-2xl lg:text-3xl mb-2">Create Post</h1>
      <hr className="mb-2" />
      <textarea
        onChange={getPostContent}
        className="border-0 w-full bg-slate-100  resize-none outline-none p-2 rounded-lg"
        value={postContent}
        name="post"
        rows={6}
        placeholder="Start class discussion"
      ></textarea>
      <label htmlFor="fileInput">
        <input
          type="file"
          id="fileInput"
          accept=".jpg, .jpeg, .png, .pdf"
        />
      </label>
      <div className="flex flex-row items-center justify-end">

        <button
          onClick={() => setOpenModal(false)}
          className="px-2 py-1 mr-2 rounded-md shadow-lg bg-slate-500 hover:bg-slate-700 text-slate-50 uppercase"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-2 py-1 flex items-center justify-center rounded-md shadow-lg
            bg-slate-500 hover:bg-slate-700 text-slate-50  uppercase"
        >
          {loading ? <svg
            className="animate-spin inline-block -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg> : <span>Post</span>}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
