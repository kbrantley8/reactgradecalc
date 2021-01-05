import {
    COURSE_LOAD_STARTED,
    COURSE_LOAD_SUCCESS,
    COURSE_LOAD_FAILURE
} from '../actionTypes';

import firebase from '../../firebase';

const loadCoursesStarted = () => ({
    type: COURSE_LOAD_STARTED
});

const loadCoursesSuccess = course_list => ({
    type: COURSE_LOAD_SUCCESS,
    payload: {
        course_list
    }
});

const loadCoursesFailure = error => ({
    type: COURSE_LOAD_FAILURE,
    payload: {
        error
    }
});

export const loadCourses = () => {
    return dispatch => {
    dispatch(loadCoursesStarted());
    var arr = [];
    firebase
        .firestore()
        .collection("courses")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push({
                    name: doc.data().name,
                    sections: doc.data().sections,
                    uniqueId: doc.id
                })
            });
            dispatch(loadCoursesSuccess(arr))
        })
        .catch(err => {
            dispatch(loadCoursesFailure(err.message));
        });
    };
};
  