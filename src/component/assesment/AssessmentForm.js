import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Container, Navbar, Alert } from 'react-bootstrap';
import { fetchAssessments, addAssessment } from '../../redux/actions/assessmentActions';
import TrueFalse from './TrueFalse';
import MultipleChoice from './MultipleChoice';
import Essay from './Essay';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

function AssessmentForm() {
  const [name, setName] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchAssessments());
  }, [dispatch]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleQuestionTypeChange = (e) => setQuestionType(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      dispatch(addAssessment({ name, typeId: questionType, duration, createDate: new Date().toISOString(), questions }));
      navigate('/assessment');
    }

    setValidated(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>           
            Add New Assessment
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <h2>Create a New Assessment</h2>
          <Form.Group className="mb-3">
            <Form.Label>Assessment Name</Form.Label>
            <Form.Control required type="text" value={name} onChange={handleNameChange} placeholder="Enter assessment name" />
            <Form.Control.Feedback type="invalid">
              Please provide a name for the assessment.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control required type="number" min="1" value={duration} onChange={handleDurationChange} placeholder="Duration in minutes" />
            <Form.Control.Feedback type="invalid">
              Please provide a duration for the assessment.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type of Assessment</Form.Label>
            <Form.Select required aria-label="Default select" onChange={handleQuestionTypeChange} value={questionType}>
              <option value="">Select type</option>
              <option value="1">Multiple Choice</option>
              <option value="2">True/False</option>
              <option value="3">Essay</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a type of assessment.
            </Form.Control.Feedback>
          </Form.Group>

          {questionType && !questions.length && (
            <Alert variant="info">
              Please add some questions to the assessment.
            </Alert>
          )}

          {questionType === '1' && <MultipleChoice setQuestions={setQuestions} />}
          {questionType === '2' && <TrueFalse setQuestions={setQuestions} />}
          {questionType === '3' && <Essay setQuestions={setQuestions} />}

          <Button variant="success" type="submit" disabled={!name || !questionType || !duration || questions.length === 0}>
            <FontAwesomeIcon icon={faSave} className="mr-2" />{" "}
            Submit Assessment
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AssessmentForm;