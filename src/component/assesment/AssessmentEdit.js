import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAssessmentById, updateAssessment } from '../../redux/actions/assessmentActions';
import { Form, Button, Container, Navbar } from 'react-bootstrap';
import TrueFalse from './TrueFalse';
import MultipleChoice from './MultipleChoice';
import Essay from './Essay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

function AssessmentEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assessment = useSelector((state) => state.assessment.currentAssessment);
  const [questions, setQuestions] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {

    if (!hasFetched || assessment.id !== id) {
      dispatch(fetchAssessmentById(id))
        .then(() => setHasFetched(true)); 
    }

    if (assessment && assessment.id === id) {
      setQuestions(assessment.questions || []);
    }
  }, [id, dispatch]);

  useEffect(() => {
    setHasFetched(false);
  }, [id]);


  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(updateAssessment({ ...assessment, questions }))
      .then(() => {
        navigate('/assessment');
      });
  };

  if (!assessment) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Edit Assessment</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Form onSubmit={handleFormSubmit}>
          <h2>Edit Assessment</h2>
          <Form.Group className="mb-3">
            <Form.Label>Assessment Name</Form.Label>
            <Form.Control type="text" value={assessment.name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control type="number" value={assessment.duration} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type of Assessment</Form.Label>
            <Form.Control type="text" value={assessment.typeId === '1' ? 'Multiple Choice' : assessment.typeId === '2' ? 'True/False' : 'Essay'} disabled />
          </Form.Group>

          {/* Conditionally render question components based on the assessment type */}
          {assessment.typeId === '1' && <MultipleChoice setQuestions={setQuestions} questions={questions} />}
          {assessment.typeId === '2' && <TrueFalse setQuestions={setQuestions} questions={questions} />}
          {assessment.typeId === '3' && <Essay setQuestions={setQuestions} questions={questions} />}

          <Button variant="success" type="submit">
            <FontAwesomeIcon icon={faSave} /> Save Changes
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AssessmentEdit;
