import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import course_list from './reducers/course_list'
import modal from './reducers/modal'
  

const reducer = combineReducers({
    course_list,
    modal
});

export const store = createStore(reducer, applyMiddleware(thunk));
