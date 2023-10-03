import { useContext, useState } from "react";
import useAuth from "../../hooks/Auth/useAuth";
import { handlePostMethod } from "../../utilities/handlePostMethod";
import Loader from "../Loader/Loader";
import useFirebaseStorage from "../../hooks/Firebase/useFirebaseStorage";
import { PostContext } from "../../context_api/PostProvider/PostProvider";
import { ClassroomContext } from "../../context_api/ClassroomProvider/ClassroomProvider";

const CreatePost = ({ id, setOpenModal }) => {
  const { user } = useAuth();
  const { handleUpload } = useFirebaseStorage()
  const [file, setFile] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false)
  const [fileSizeError, setFileSizeError] = useState(false)
  const {dispatch}=useContext(ClassroomContext)

  //file upload on UI
  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    if (file.size > 1024 * 1024 * 2) {
      setFileSizeError(true)
    }
    else {
      setFileSizeError(false)
    }
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
      if (fileSizeError) {
        return
      }
      const media = await handleUpload(file)
      if (postContent.length < 1 && !(media.url)) {
        return
      }

      let data = {
        author: {
          id: user.uid,
          name: user.displayName,
          photoURL: user.photoURL
        },
        classId: id,
        content: postContent,
        likes: [],
        media: media,
        comments: [],
        timestamps: new Date().toString()
      }
      const postUrl = "http://localhost:3000/api/v1/posts"
      const result = await handlePostMethod(postUrl, data)
      const postId = result.postId;
      if (result.modifiedCount) {
        dispatch({
          type:'add',
          payload:{
            id:postId
          }
        })
      }
      setOpenModal(false)
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
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
            className="px-2 py-1  rounded-md shadow-lg bg-indigo-500 hover:bg-indigo-800 text-slate-50 uppercase"
          >
            Cancel
          </button>
        </div>
        <hr className="mb-2" />
        <div>
          <textarea
            autoFocus
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
          <div className="file-input-wrapper my-2">
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleChangeFile} id="customFileInput" />
            <label>
              <svg className="inline-block mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
              </svg>
              <span>Choose a file</span>
            </label>
            <span id="selectedFileName">{file.name}</span>
          </div>
          {fileSizeError && <span className="text-red-700 text-sm block">File size can not exceed 2 MB</span>}
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1 flex items-center justify-center rounded-md shadow-lg
          bg-indigo-500 hover:bg-indigo-800 text-slate-50  uppercase"
        >
          {loading && <Loader></Loader>}<span>Post</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
