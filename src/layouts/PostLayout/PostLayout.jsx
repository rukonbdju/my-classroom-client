import Posts from "../../components/PostComponents/Posts/Posts"
import CommentProvider from "../../context_api/CommentProvider/CommentProvider"
import PostProvider from "../../context_api/PostProvider/PostProvider"

const PostLayout = () => {
    return (
        <PostProvider>
            <CommentProvider>
                <Posts></Posts>
            </CommentProvider>
        </PostProvider>
    )
}
export default PostLayout