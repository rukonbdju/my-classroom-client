import { createContext, useContext, useEffect, useReducer, useState } from "react"
import PostReducer from "../../reducer/PostReducer/PostReducer";
import { ClassroomContext } from "../ClassroomProvider/ClassroomProvider";
import { handleGetMethod } from "../../utilities/handleGetMethod";

export const PostContext=createContext()

const PostProvider=({children})=>{
    const {classroom}=useContext(ClassroomContext)
    const[posts,dispatch]=useReducer(PostReducer,null)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            setPage((prevPage) => prevPage < 20 ? prevPage + 1 : prevPage);
        }
    };

    useEffect(() => {
        if (page < 2) {
            setLoading(true)
        }
        const getPosts = async (url) => {
            const result = await handleGetMethod(url)
            if (page === 1) {
                //setPosts(result);
                dispatch({
                    type:'initialState',
                    payload:result
                })
            }
            else {
                //setPosts(prevPosts => [...prevPosts, ...result]);
                dispatch({
                    type:'onScroll',
                    payload:result
                })
            }
            setLoading(false)
        }
        if (page < 20) {
            const url = `https://my-classroom-server.onrender.com/api/v1/posts?classId=${classroom?._id}&page=${page}`
            getPosts(url)
        }

    }, [page])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return(
        <PostContext.Provider value={{loading,posts,dispatch}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider;