import { createContext } from "react"

export const CommentContext=createContext()
const CommentProvider=({children})=>{
    const comments=[1,2,3]
    return(
        <CommentContext.Provider value={comments}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;