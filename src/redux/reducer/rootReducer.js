import { combineReducers } from 'redux';
import userReducer from './userReducer';
import assessmentReducer from './assessmentReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({

    user: userReducer,
    assessment: assessmentReducer,
    course:courseReducer

});

export default rootReducer;