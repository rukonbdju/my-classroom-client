const ClassroomReducer = (classroom, action) => {
    switch (action.type) {
        case 'initialState': {
            return action.payload;
        }
        case 'newState': {
            return action.payload;
        }
        case 'add': {
            if (classroom?.posts?.find(id => id === action.payload.id)) {
                return classroom
            }
            else {
                return {...classroom,posts:[action.payload.id, ...classroom.posts]}
            }

        }
        case 'edit': {

        }
        case 'delete': {
            return {...classroom,posts:classroom.posts.filter(id=>action.payload.postId!==id)}
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default ClassroomReducer;