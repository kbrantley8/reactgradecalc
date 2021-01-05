import {
    COURSE_LOAD_STARTED,
    COURSE_LOAD_SUCCESS,
    COURSE_LOAD_FAILURE,
    ADD_COURSE_STARTED,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAILURE,
    DELETE_COURSE_STARTED,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILURE,
    ADD_SECTION_STARTED,
    ADD_SECTION_SUCCESS,
    ADD_SECTION_FAILURE,
    DELETE_SECTION_STARTED,
    DELETE_SECTION_SUCCESS,
    DELETE_SECTION_FAILURE,
    EDIT_SECTION_STARTED,
    EDIT_SECTION_SUCCESS,
    EDIT_SECTION_FAILURE
} from '../actionTypes';
  
const calculateAverage = (sections) => {
    let tops = 0;
    let weights = 0;
    sections.forEach((section) => {
        tops += section.weight * section.avg;
        weights += section.weight;
    })
    let average = (tops/weights).toFixed(2);
    return average
}

export default (state = { course_list: [], showCourseModal: false }, action) => {
    var course;
    switch (action.type) {
        case COURSE_LOAD_STARTED:
            return {
                ...state,
                loading: true
            };
        case COURSE_LOAD_SUCCESS:
            var course_load_new_courses = [];
            for (let index in action.payload.course_list) {
                course = action.payload.course_list[index]
                course.average = calculateAverage(course.sections)
                course_load_new_courses.push(course)
            }
            return {
                ...state,
                course_list: course_load_new_courses,
                loading: false
            };
        case COURSE_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_COURSE_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_COURSE_SUCCESS:
            return {
                ...state,
                course_list: [ action.payload.course, ...state.course_list ],
                loading: false
            }
        case ADD_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_COURSE_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_COURSE_SUCCESS:
            var delete_course_new_courses = [];
            for (let index in state.course_list) {
                course = state.course_list[index]
                if (course.uniqueId !== action.payload.uniqueId) {
                    delete_course_new_courses.push(course)
                }
            }
            return {
                ...state,
                course_list: delete_course_new_courses,
                loading: false
            }
        case DELETE_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_SECTION_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_SECTION_SUCCESS:
            var add_section_new_courses = [];
            for (let index in state.course_list) {
                course = state.course_list[index]
                if (course.uniqueId === action.payload.response[0]) {
                    course.sections = action.payload.response[1].sections
                    course.average = calculateAverage(action.payload.response[1].sections)
                }
                add_section_new_courses.push(course)
                
            }
            return {
                ...state,
                course_list: add_section_new_courses,
                loading: false
            }
        case ADD_SECTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_SECTION_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_SECTION_SUCCESS:
            var delete_section_new_courses = [];
            for (let index in state.course_list) {
                course = state.course_list[index]
                if (course.uniqueId === action.payload.response[0]) {
                    course.sections = action.payload.response[1]
                    course.average = calculateAverage(action.payload.response[1])
                }
                delete_section_new_courses.push(course)
                
            }
            return {
                ...state,
                course_list: delete_section_new_courses,
                loading: false
            }
        case DELETE_SECTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_SECTION_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_SECTION_SUCCESS:
            var new_courses = [];
            for (let index in state.course_list) {
                course = state.course_list[index]
                if (course.uniqueId === action.payload.response[0]) {
                    course.sections = action.payload.response[1].sections
                    course.average = calculateAverage(action.payload.response[1].sections)
                }
                new_courses.push(course)
                
            }
            return {
                ...state,
                course_list: new_courses,
                loading: false
            }
        case EDIT_SECTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};