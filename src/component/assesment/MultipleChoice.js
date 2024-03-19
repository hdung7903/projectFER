import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'
import axios from 'axios';
import uuid from 'react-uuid';

function MultipleChoice({ onSubmit }) {
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);

    const handleTotalQuestionChange = (event) => {
        setTotalQuestions(event.target.value);
    };

    const handleQuestionTextChange = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = text;
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.push('');
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = text;
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = text;
        setQuestions(updatedQuestions);
    };

    const addQuestions = () => {
        const newQuestions = Array.from({ length: totalQuestions }, (_, i) => ({
            id: i+1,
            text: '',
            options: [''],
            answer: '',
        }));
        setQuestions(newQuestions);
    };

    const handleAddQuestionsToAssessment = () => {
        const filledQuestions = questions.filter(question => question.text.trim() !== '');
        onSubmit(filledQuestions); // Pass the questions up to the AssessmentForm
    };

    return (
        <>
            <Form.Label htmlFor="totalquestion">Number of Questions</Form.Label>
            <Form.Control
                type="number"
                id="totalquestion"
                aria-describedby="passwordHelpBlock"
                onChange={handleTotalQuestionChange}
            />
            <Button onClick={addQuestions}>Add Questions</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Question</th>
                        <th>Options</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, qIndex) => (
                        <tr key={qIndex}>
                            <td>{question.id}</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                                />
                            </td>
                            <td>
                                {question.options.map((option, oIndex) => (
                                    <Form.Control
                                        key={oIndex}
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    />
                                ))}
                                <Button onClick={() => handleAddOption(qIndex)}>Add Option</Button>
                            </td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={question.answer}
                                    onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                                >
                                    <option value="">Select answer</option>
                                    {question.options.map((option, oIndex) => (
                                        <option key={oIndex} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={handleAddQuestionsToAssessment}>Submit Questions</Button>
        </>
    );
}

export default MultipleChoice;