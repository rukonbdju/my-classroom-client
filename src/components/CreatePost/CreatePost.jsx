import React, { useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import Loader from "../Loader/Loader";
import useFirebaseStorage from "../../hooks/Firebase/useFirebaseStorage";

const CreatePost = ({ id, setOpenModal,setPosts}) => {
  const { user } = useAuth();
  const {handleUpload}=useFirebaseStorage()
  const [file,setFile]=useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false)

  //file upload
  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    setFile(file)
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (event) => {
      setSelectedFile(event.target.result);
    };
  }

  //get post content
  const getPostContent = (e) => {
    e.preventDefault();
    setPostContent(e.target.value);
  };

  // save post in database
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const media=await handleUpload(file)
      if (postContent.length < 1 && !(media.url)) {
        return
      }

      let data = {
        author: {
          id:user.uid,
          name:user.displayName,
          photoURL:user.photoURL
        },
        classId:id,
        content: postContent,
        likes: [],
        media: media,
        comments: [],
        timestamps: new Date().toString()
      }
      const postUrl = "https://my-classroom-server.onrender.com/api/v1/posts"
      const result = await handlePostMethod(postUrl, data)
      const postId = result.postId;
      if (result.modifiedCount) {
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

    <div className=" z-50 fixed top-0 left-0 overflow-hidden bg-slate-600 bg-opacity-50  w-screen h-screen flex justify-center">
      <form
        onSubmit={handleCreatePost}
        className=" bg-slate-200 w-11/12 md:w-2/3 lg:w-1/3 h-max  p-2 rounded-lg mt-24" >
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-2">Create Post</h1>
            <button
              onClick={() => setOpenModal(false)}
              className="px-2 py-1  rounded-md shadow-lg bg-slate-500 hover:bg-slate-700 text-slate-50 uppercase"
            >
              Cancel
            </button>
        </div>
        <hr className="mb-2" />
        <div>
        <textarea
          onChange={getPostContent}
          className="border-0 w-full bg-slate-100  resize-none outline-none p-2 rounded-lg"
          value={postContent}
          name="post"
          rows={8}
          placeholder="Start class discussion"
        ></textarea>
        {selectedFile && <div className="w-full h-48 overflow-auto mx-auto">
          <img className="mx-auto" src={selectedFile} />
        </div>}
        <input
          className="my-2"
          onChange={handleChangeFile}
          type="file"
          id="fileInput"
          accept=".jpg, .jpeg, .png, .pdf"
        />
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1 flex items-center justify-center rounded-md shadow-lg
      bg-slate-500 hover:bg-slate-700 text-slate-50  uppercase"
        >
          {loading && <Loader></Loader>}<span>Post</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
