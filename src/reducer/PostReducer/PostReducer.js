import { actionTypes } from "./actionTypes";
const PostReducer=(posts,action)=>{
    switch (action.type) {
        case 'initialState': {
            return action.payload
        }
        case 'onScroll': {
            return [...posts,...action.payload]
        }
        case actionTypes.add: {
            return [action.payload,...posts]
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

export default PostReducer;