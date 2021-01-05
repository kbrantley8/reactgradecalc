import {
    DELETE_SECTION_STARTED,
    DELETE_SECTION_SUCCESS,
    DELETE_SECTION_FAILURE
} from '../actionTypes';

import firebase from '../../firebase';

const deleteSectionStarted = () => ({
    type: DELETE_SECTION_STARTED
});

const deleteSectionSuccess = response => ({
    type: DELETE_SECTION_SUCCESS,
    payload: {
        response
    }
});

const deleteSectionFailure = error => ({
    type: DELETE_SECTION_FAILURE,
    payload: {
        error
    }
});

export const deleteSection = (uniqueId, data) => {
    return dispatch => {
    dispatch(deleteSectionStarted());
    var prom = new Promise(function(resolve, reject) {
        let db = firebase.firestore();
        if (db.collection('courses').doc(uniqueId).update({sections: data})) {
            resolve()
        } else {
            reject('Error')
        }

    })
    prom.then(
        function() { dispatch(deleteSectionSuccess([uniqueId, data]))  },
        function(err) { dispatch(deleteSectionFailure(err)) }
    )
    };
};
  