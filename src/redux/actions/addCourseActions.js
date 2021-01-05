import {
    ADD_COURSE_STARTED,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAILURE
} from '../actionTypes';

import firebase from '../../firebase';

const addCourseStarted = () => ({
    type: ADD_COURSE_STARTED
});

const addCourseSuccess = course => ({
    type: ADD_COURSE_SUCCESS,
    payload: {
        course
    }
});

const addCourseFailure = error => ({
    type: ADD_COURSE_FAILURE,
    payload: {
        error
    }
});

export const addCourse = (name) => {
    return dispatch => {
    dispatch(addCourseStarted());
    const uuidv4 = require('uuid/v4');
    var uniqueId = uuidv4();
    const data = {
        name: name,
        sections: [],
        uniqueId: uniqueId
    };
    var prom = new Promise(function(resolve, reject) {
        let db = firebase.firestore();
        if (db.collection('courses').doc(data.uniqueId).set(data)) {
            resolve()
        } else {
            reject('Error')
        }

    })
    prom.then(
        function() { dispatch(addCourseSuccess(data))  },
        function(err) { dispatch(addCourseFailure(err)) }
    )
    };
};
  