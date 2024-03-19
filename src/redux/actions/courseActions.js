import { toast } from "react-toastify";
import { ADD_COURSE, FETCH_COURSES, UPDATE_COURSE, DELETE_COURSES } from "./types";
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
  return (dispatch) => {
    axios.delete(`http://localhost:8000/courses/${courseId}`)
      .then(() => {
        dispatch({ type: DELETE_COURSES, payload: courseId });
        toast.success('Course deleted successfully!');
        dispatch(fetchCourses());
      })
      .catch(error => {
        console.error('Failed to delete course', error);
        toast.error(error.message);
      });
  };
};

export const updateCourse = (course) => {
  return (dispatch) => {
    return axios.put(`http://localhost:8000/courses/${course.id}`, course)
      .then(response => {
        dispatch({
          type: 'UPDATE_COURSE', 
          payload: response.data
        });
      })
      .catch(error => {
        console.error('Error updating course:', error);
        toast.error(error.message);
      });
  };
};