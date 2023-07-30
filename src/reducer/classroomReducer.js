const classroomReducer = (classroom, action) => {
    switch (action.type) {
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

export default classroomReducer;