import React, { useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import useClassroom from "../../hooks/classroom/useClassroom";

const ClassroomPost = ({ modalOpen, setModalOpen, id }) => {
  let { postResult, createNewPost } = useClassroom()
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  console.log(postResult)
  const handleWritePost = (e) => {
    e.preventDefault();
    setPostContent(e.target.value);
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const uid = user.uid;
      const name = user.displayName;
      const email = user.email;
      const classId = id;
      const likes = [];
      const comments = [];
      const timestamps = new Date().toString();
      let data = { uid, name, email, postContent, classId, likes,comments, timestamps };
      const url = 'http://localhost:3000/api/v1/posts'
      await createNewPost(url, data)
    } catch {
      error=>console.log(error)
    } finally {
      setModalOpen(false)
    }
  };
  return (
    <dialog open className="z-50 fixed w-screen h-screen flex items-center justify-center bg-slate-300 bg-opacity-40">
      <form className="w-3/5 bg-slate-50 p-4 rounded-lg" onSubmit={handleCreatePost}>
        <h1 className="text-3xl mb-2">Create Post</h1>
        <hr className="mb-2" />
        <textarea
          onChange={handleWritePost}
          className="border-0 w-full bg-slate-100  resize-none outline-none p-2 rounded-lg"
          value={postContent}
          name="post"
          rows={8}
          placeholder="Start class discussion"
        ></textarea>
        <label htmlFor="fileInput">
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg, .png, .pdf"
          />
        </label>
        <div className=" text-end">

          <button
            onClick={() => setModalOpen(false)}
            className="p-2 mr-2 rounded-md shadow-lg bg-blue-700 text-slate-50 font-bold uppercase"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 rounded-md shadow-lg bg-blue-700 text-slate-50 font-bold uppercase"
          >
            Post
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ClassroomPost;
