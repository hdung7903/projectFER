import { ADD_COURSE,FETCH_COURSES, DELETE_COURSES, UPDATE_COURSE } from '../actions/types';

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
      case UPDATE_COURSE:
        const updatedCourses = state.courses.map(c => 
          c.id === action.payload.id ? action.payload : c
        );
        return { ...state, courses: updatedCourses };    
      default:
        return state;
    }
  };
  
export default courseReducer;