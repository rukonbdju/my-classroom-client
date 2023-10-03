import { actionTypes } from "../PostReducer/actionTypes";

const CommentReducer=(comments,action)=>{
    switch (action.type) {
        case 'initialValue': {
            return action.payload
        }
        case actionTypes.add: {
            return[action.payload,...comments]
        }
        case actionTypes.edit: {

        }
        case actionTypes.delete: {
            return comments.filter((comment)=>comment._id!==action.payload.commentId)
        }
        case actionTypes.like: {

        }
        case actionTypes.dislike: {

        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default CommentReducer;