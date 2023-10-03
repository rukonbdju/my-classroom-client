import { createContext, memo, useContext, useEffect, useReducer, useState } from "react"
import PostReducer from "../../reducer/PostReducer/PostReducer";
import { ClassroomContext } from "../ClassroomProvider/ClassroomProvider";
import { handleGetMethod } from "../../utilities/handleGetMethod";

export const PostContext = createContext()

const PostProvider = ({ children }) => {
    const [post, dispatch] = useReducer(PostReducer, null)
    
    //const [page, setPage] = useState(1);
    //const [loading, setLoading] = useState(false)
    /* const handleScroll = () => {
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
        const getPosts = async () => {
            const url = `http://localhost:3000/api/v1/posts?classId=${classroom?._id}&page=${page}`
            const result = await handleGetMethod(url)
            if (page === 1) {
                //setPosts(result);
                dispatch({
                    type: 'initialState',
                    payload: result
                })
            }
            else if (page < 20) {
                const url = `http://localhost:3000/api/v1/posts?classId=${classroom?._id}&page=${page}`
                const result = await handleGetMethod(url)
                dispatch({
                    type: 'onScroll',
                    payload: result
                })


            }
            setLoading(false)
        }
        getPosts()

    }, [page])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); */
    return (
        <PostContext.Provider value={{ post, dispatch }}>
            {children}
        </PostContext.Provider>
    )
}

export default memo(PostProvider);