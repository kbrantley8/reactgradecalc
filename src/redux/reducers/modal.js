import {
    SHOW_COURSE_MODAL,
    HIDE_COURSE_MODAL
} from '../actionTypes';
  
export default (state = { id: null }, action) => {
    switch (action.type) {
        case SHOW_COURSE_MODAL:
            return {
                ...state,
                id: action.payload
            };
        case HIDE_COURSE_MODAL:
            return {
                ...state,
                id: null
            };
        default:
            return state;
    }
};