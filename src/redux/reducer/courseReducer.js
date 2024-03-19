import { ADD_COURSE,FETCH_COURSES, DELETE_COURSES } from '../actions/types';

const initialState = {
    courses: [],
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_COURSE:
        return { ...state, courses: state.courses.concat(action.payload) };
  
      case FETCH_COURSES:
        return { ...state, courses: action.payload };
      
        case DELETE_COURSES:
          return { ...state, courses: state.courses.filter(course => course.id !== action.payload) };
      default:
        return state;
    }
  };
  
export default courseReducer;