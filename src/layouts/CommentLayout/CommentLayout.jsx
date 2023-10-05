import CommentBox from "../../components/CommentBox/CommentBox"
import CommentProvider from "../../context_api/CommentProvider/CommentProvider"

const CommentLayout = () => {
    
    return (
        <CommentProvider>
            <CommentBox ></CommentBox>
        </CommentProvider>
    )

}

export default CommentLayout