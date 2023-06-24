import React, { useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import { handlePutMethod } from "../../utilities/handlePutMethod";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const CreatePost = ({ setPosts, setOpenModal }) => {
  const params = useParams()
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [postCreationResult, setPostCreationResult] = useState({})
  const [loading, setLoading] = useState(false)


  const getPostContent = (e) => {
    e.preventDefault();
    setPostContent(e.target.value);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      let data = {
        author: user.uid,
        classId: params.id,
        content: postContent,
        likes: [],
        comments: [],
        timestamps: new Date().toString()
      }
      const postUrl = "https://my-classroom-server.onrender.com/api/v1/posts"
      const result = await handlePostMethod(postUrl, data)
      const postId = result.insertedId;

      const classroomUrl = `https://my-classroom-server.onrender.com/api/v1/classrooms/${params.id}`
      const addRefToClass = await handlePutMethod(classroomUrl, { postId })
      setPostCreationResult(addRefToClass)
      if (addRefToClass.modifiedCount) {
        data._id = postId;
        setPosts((prevPosts) => [data, ...prevPosts])
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
      setOpenModal(false)
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
          {loading && <Loader></Loader>}<span>Post</span>
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
