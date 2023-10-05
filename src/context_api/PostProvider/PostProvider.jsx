import { createContext, memo, useEffect, useReducer, useState } from "react"
import PostReducer from "../../reducer/PostReducer/PostReducer";
import { handleGetMethod } from "../../utilities/handleGetMethod";

export const PostContext = createContext()

const PostProvider = ({ children,id }) => {
    const [post, dispatch] = useReducer(PostReducer, {})
    const [loading, setLaoding] = useState(false)
    useEffect(() => {
        
        setLaoding(true)
        const getPostById = async () => {
            const url = `https://my-classroom-server.onrender.com/api/v1/posts/${id}`;
            const result = await handleGetMethod(url)
            dispatch({
                type:'initialState',
                payload:result
            })
            setLaoding(false)
        }
        getPostById()

    }, [id])

    return (
        <PostContext.Provider value={{loading, post, dispatch }}>
            {children}
        </PostContext.Provider>
    )
}

export default memo(PostProvider);