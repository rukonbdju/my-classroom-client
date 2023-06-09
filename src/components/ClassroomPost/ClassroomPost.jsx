import React, { useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";

const ClassroomPost = ({id}) => {
const {user}=useAuth();
  const [postContent, setPostContent] = useState("");
  const handleWritePost = (e) => {
    e.preventDefault();
    setPostContent(e.target.value);
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const uid = user.uid;
    const name = user.displayName;
    const email = user.email;
    const classId = id;
    const timestamps = new Date().toString();
    const data = { uid, name, email, postContent, classId, timestamps };
    console.log(data);
  };
  return (
    <div className="w-screen h-screen absolute flex items-center justify-center top-0 left-0 bg-slate-700 bg-opacity-60">
        <form className="w-3/5 bg-slate-50 p-4 rounded-lg" onSubmit={handleCreatePost}>
          <textarea
            onChange={handleWritePost}
            className="border-0 w-full bg-slate-100  resize-none outline-none p-2 rounded-lg"
            value={postContent}
            name="post"
            rows={8}
            placeholder="Start class discussion"
          ></textarea>
          <div className=" text-end">
            <button
              type="submit"
              className="p-2 rounded-md shadow-lg bg-blue-700 text-slate-50 font-bold uppercase"
            >
              Post
            </button>
          </div>
        </form>
    </div>
  );
};

export default ClassroomPost;
