import {
    EDIT_SECTION_STARTED,
    EDIT_SECTION_SUCCESS,
    EDIT_SECTION_FAILURE
} from '../actionTypes';

import firebase from '../../firebase';

const editSectionStarted = () => ({
    type: EDIT_SECTION_STARTED
});

const editSectionSuccess = response => ({
    type: EDIT_SECTION_SUCCESS,
    payload: {
        response
    }
});

const editSectionFailure = error => ({
    type: EDIT_SECTION_FAILURE,
    payload: {
        error
    }
});

export const editSection = (uniqueId, data) => {
    return dispatch => {
    dispatch(editSectionStarted());
    var prom = new Promise(function(resolve, reject) {
        let db = firebase.firestore();
        if (db.collection('courses').doc(uniqueId).update(data)) {
            resolve()
        } else {
            reject('Error')
        }

    })
    prom.then(
        function() { dispatch(editSectionSuccess([uniqueId, data]))  },
        function(err) { dispatch(editSectionFailure(err)) }
    )
    };
};
  