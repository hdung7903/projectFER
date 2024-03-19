import { ADD_COURSE,FETCH_COURSES, DELETE_COURSES, UPDATE_COURSE } from '../actions/types';

const initialState = {
    courses: [],
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_COURSE:
        return { ...state, courses: [...state.courses, action.payload] };
      case FETCH_COURSES:
        return { ...state, courses: action.payload };
      case DELETE_COURSES:
        return { ...state, courses: state.courses.filter(course => course.id !== action.payload) };
        case 'UPDATE_COURSE':
          const index = state.courses.findIndex(course => course.id === action.payload.id);
          const updatedCourses = [...state.courses];
          updatedCourses[index] = action.payload;
          return { ...state, courses: updatedCourses };  
      default:
        return state;
    }
  };
  
export default courseReducer;