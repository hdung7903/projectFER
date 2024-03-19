import { FETCH_ASSESSMENTS, ADD_ASSESSMENT, FETCH_ASSESSMENT_BY_ID, UPDATE_ASSESSMENT } from '../actions/types';

const initialState = {
  assessments: [],
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSESSMENTS:
      return {
        ...state,
        assessments: action.payload,
      };
    case ADD_ASSESSMENT:
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
      };
      case FETCH_ASSESSMENT_BY_ID:
      return {
        ...state,
        currentAssessment: action.payload,
      };
    case UPDATE_ASSESSMENT:
      return {
        ...state,
        assessments: state.assessments.map((assessment) =>
          assessment.id === action.payload.id ? action.payload : assessment
        ),
      };
    default:
      return state;
  }
};

export default assessmentReducer;
