import {
    DELETE_COURSE_STARTED,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILURE
} from '../actionTypes';

import firebase from '../../firebase';

const deleteCourseStarted = () => ({
    type: DELETE_COURSE_STARTED
});

const deleteCourseSuccess = uniqueId => ({
    type: DELETE_COURSE_SUCCESS,
    payload: {
        uniqueId
    }
});

const deleteCourseFailure = error => ({
    type: DELETE_COURSE_FAILURE,
    payload: {
        error
    }
});

export const deleteCourse = (uniqueId) => {
    return dispatch => {
    dispatch(deleteCourseStarted());
    var prom = new Promise(function(resolve, reject) {
        let db = firebase.firestore();
        if (db.collection('courses').doc(uniqueId).delete()) {
            resolve()
        } else {
            reject('Error')
        }

    })
    prom.then(
        function(val) { dispatch(deleteCourseSuccess(uniqueId))  },
        function(err) { dispatch(deleteCourseFailure(err)) }
    )

    };
};
  