import { actionTypes } from "./actionTypes";
const PostReducer=(posts,action)=>{
    console.log(posts)
    switch (action.type) {
        case 'initialState': {
            return action.payload
        }
        case 'onScroll': {
            if(action.payload.length){
                return [...posts,...action.payload]
            }
            else{
                return posts;
            }
        }
        case actionTypes.add: {
            return [action.payload,...posts]
        }
        case actionTypes.edit: {
            return posts.filter((post)=>post._id!==action.payload.id)

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