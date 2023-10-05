import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { PostContext } from "../PostProvider/PostProvider"
import CommentReducer from "../../reducer/CommentReducer/CommentReducer"
import { handleGetMethod } from "../../utilities/handleGetMethod"

export const CommentContext=createContext()

const CommentProvider=({children})=>{
    const {post}=useContext(PostContext)
    const [loading, setLoading] = useState(false)
    const [comments,commentDispatch]=useReducer(CommentReducer,[])
    //get all comments of a post
    useEffect(() => {
        setLoading(true)
        const getComments = async (url) => {
            const result = await handleGetMethod(url)
            commentDispatch({
                type:"initialValue",
                payload:result
            })
            setLoading(false)
        }
        const url = `https://my-classroom-server.onrender.com/api/v1/comments?postId=${post._id}`
         getComments(url)
         
    }, [])
    
    return(
        <CommentContext.Provider value={{loading,comments,commentDispatch}}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;