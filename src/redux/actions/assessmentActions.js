import { FETCH_ASSESSMENTS, ADD_ASSESSMENT, FETCH_ASSESSMENT_BY_ID, UPDATE_ASSESSMENT } from './types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchAssessments = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/assessments');
    dispatch({
      type: FETCH_ASSESSMENTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching assessments:', error);
  }
};

export const addAssessment = (assessment) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8000/assessments', assessment);
    dispatch({
      type: ADD_ASSESSMENT,
      payload: response.data,
    });
    toast.success("Assessment added successfully");
  } catch (error) {
    toast.error("Failed to add assessment");
    console.error('Error adding assessment:', error);
  }
};
export const fetchAssessmentById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8000/assessments/${id}`);
    dispatch({
      type: FETCH_ASSESSMENT_BY_ID,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching assessment by ID:', error);
  }
};

export const updateAssessment = (assessment) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8000/assessments/${assessment.id}`, assessment);
    dispatch({
      type: UPDATE_ASSESSMENT,
      payload: response.data,
    });
    toast.success("Assessment updated successfully");
  } catch (error) {
    toast.error("Failed to update assessment");
    console.error('Error updating assessment:', error);
  }
};
