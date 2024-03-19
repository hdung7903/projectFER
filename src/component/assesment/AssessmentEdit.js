import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { fetchAssessmentById, updateAssessment } from '../../redux/actions/assessmentActions';

function AssessmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assessment = useSelector(state => state.assessment.currentAssessment);
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dispatch(fetchAssessmentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (assessment) {
      setName(assessment.name);
      setTypeId(assessment.typeId);
      setDuration(assessment.duration);
      setQuestions(assessment.questions);
    }
  }, [assessment]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleTypeIdChange = (e) => setTypeId(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleQuestionChange = (updatedQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAssessment = {
      id,
      name,
      typeId: Number(typeId),
      duration,
      questions,
    };
    dispatch(updateAssessment(updatedAssessment));
    navigate('/home'); // Redirect to home after update
  };

  // Render a form for editing a question
  const renderQuestionForm = (question, index) => (
    <Form.Group key={question.id} className="mb-3">
      <Form.Label>Question {index + 1}</Form.Label>
      <Form.Control
        type="text"
        value={question.text}
        onChange={(e) => handleQuestionChange({ ...question, text: e.target.value })}
      />
    </Form.Group>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Assessment</h2>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Assessment Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="duration">Duration (minutes)</Form.Label>
        <Form.Control
          type="number"
          id="duration"
          value={duration}
          onChange={handleDurationChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Type of Assessment</Form.Label>
        <Form.Select
          aria-label="Default select"
          onChange={handleTypeIdChange}
          value={typeId}
        >
          <option value="">Select type</option>
          <option value="1">Multiple Choice</option>
          <option value="2">True False</option>
          <option value="3">Essay</option>
        </Form.Select>
      </Form.Group>
      {questions.map(renderQuestionForm)}
      <Button variant="primary" type="submit">
        Update Assessment
      </Button>
    </Form>
  );
}

export default AssessmentEdit;