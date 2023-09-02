const ClassroomReducer = (classroom,action) => {
    switch (action.type) {
        case 'initialState': {
            return action.payload;
        }
        case 'add': {

        }
        case 'edit': {

        }
        case 'delete': {
            
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default ClassroomReducer;