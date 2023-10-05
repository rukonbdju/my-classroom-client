import Post from "../../components/PostComponents/Post/Post"
import PostProvider from "../../context_api/PostProvider/PostProvider"

const PostLayout = ({id}) => {
    
    return (
        <PostProvider id={id}>
            <Post></Post>
        </PostProvider>
    )
}
export default PostLayout