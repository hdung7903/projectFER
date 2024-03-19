import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { fetchAssessments, addAssessment } from '../../redux/actions/assessmentActions';
import TrueFalse from './TrueFalse';
import MultipleChoice from './MultipleChoice';
import Essay from './Essay';

function AssessmentForm() {
  const [name, setName] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssessments());
  }, [dispatch]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleQuestionsSubmit = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const createDate = new Date().toISOString();
    const assessmentData = {
      name,
      typeId: questionType,
      duration,
      createDate,
      questions,
    };
    dispatch(addAssessment(assessmentData));
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <h2>Add Assessment</h2>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Assessment Name</Form.Label>
          <Form.Control type="text" id="name" value={name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="duration">Duration (minutes)</Form.Label>
          <Form.Control type="number" id="duration" value={duration} onChange={handleDurationChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type of Assessment</Form.Label>
          <Form.Select aria-label="Default select" onChange={handleQuestionTypeChange} value={questionType}>
            <option value="">Select type</option>
            <option value="1">Multiple Choice</option>
            <option value="2">True False</option>
            <option value="3">Essay</option>
          </Form.Select>
        </Form.Group>

        {/* Removed button for showing question creator. Directly showing based on questionType */}

        {questionType === '1' && <MultipleChoice onSubmit={handleQuestionsSubmit} />}
        {questionType === '2' && <TrueFalse onSubmit={handleQuestionsSubmit} />}
        {questionType === '3' && <Essay onSubmit={handleQuestionsSubmit} />}

        <Button variant="success" type="submit" disabled={!name || !questionType || !duration || questions.length === 0}>
          Submit Assessment
        </Button>
      </Form>
    </>
  );
}

export default AssessmentForm;