import { actionTypes } from "../PostReducer/actionTypes";

const CommentReducer=()=>{
    switch (action.type) {
        case actionTypes.add: {
            
        }
        case actionTypes.edit: {

        }
        case actionTypes.delete: {

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