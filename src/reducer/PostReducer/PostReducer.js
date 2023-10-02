import { actionTypes } from "./actionTypes";
const PostReducer = (post, action) => {
    switch (action.type) {
        case 'initialState': {
            return action.payload;
        }
        case 'updateComments': {
            return {...post,comments:[...post.comments,action.payload.commentId]};
        }
        case 'deleteComment': {
            return {...post,comments:post.comments.filter(id=>id!==action.payload.commentId)};
        }
        case actionTypes.like: {
            return { ...post, likes: [...post?.likes, action.payload.userId] }
        }
        case actionTypes.dislike: {
            const newArr = post?.likes?.filter(id => action.payload.userId !== id)
            console.log(newArr)
            return { ...post, likes: newArr }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default PostReducer;