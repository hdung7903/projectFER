import { toast } from "react-toastify";
import { ADD_COURSE,FETCH_COURSES } from "./types";
import axios from "axios";

const addCourseToState = (course) => ({
    type: ADD_COURSE,
    payload: course,
  });
  
  const fetchCoursesFromState = (courses) => ({
    type: FETCH_COURSES,
    payload: courses,
  });
  
  export const addCourse = (courseData) => {
    return dispatch => {
      axios.post('http://localhost:8000/courses', courseData)
        .then(response => {
          dispatch(addCourseToState(response.data));
          toast.success("Add course success!");
        })
        .catch(error => {
          console.error('Error adding course:', error);
          toast.error(error.message);
        });
    };
  };
  
  export const fetchCourses = () => {
    return dispatch => {
      axios.get('http://localhost:8000/courses')
        .then(response => {
          dispatch(fetchCoursesFromState(response.data));
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    };
  };

  export const deleteCourse = (courseId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8000/courses/${courseId}`);
            dispatch({ type: 'DELETE_COURSE', payload: courseId });
            toast.success('Course deleted successfully!');
            dispatch(fetchCourses());
        } catch (error) {
            console.error('Failed to delete course', error);
        }
    };
};
