import {
    ADD_SECTION_STARTED,
    ADD_SECTION_SUCCESS,
    ADD_SECTION_FAILURE
} from '../actionTypes';

import firebase from '../../firebase';

const addSectionStarted = () => ({
    type: ADD_SECTION_STARTED
});

const addSectionSuccess = response => ({
    type: ADD_SECTION_SUCCESS,
    payload: {
        response
    }
});

const addSectionFailure = error => ({
    type: ADD_SECTION_FAILURE,
    payload: {
        error
    }
});

export const addSection = (uniqueId, data) => {
    return dispatch => {
    dispatch(addSectionStarted());
    var prom = new Promise(function(resolve, reject) {
        let db = firebase.firestore();
        if (db.collection('courses').doc(uniqueId).update(data)) {
            resolve()
        } else {
            reject('Error')
        }

    })
    prom.then(
        function() { dispatch(addSectionSuccess([uniqueId, data]))  },
        function(err) { dispatch(addSectionFailure(err)) }
    )
    };
};
  