import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

function TrueFalse({ onSubmit }) {
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

    const handleOptionChange = (index, answer) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = answer;
        setQuestions(updatedQuestions);
    };

    const addQuestions = () => {
        const newQuestions = [];
        for (let i = 0; i < totalQuestions; i++) {
            newQuestions.push({
                id: i + 1,
                text: '',
                answer: null,
            });
        }
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
            <Table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Question</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question.id}</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Check
                                    type="radio"
                                    name={`question-${question.id}`}
                                    label="True"
                                    checked={question.answer === true}
                                    onChange={() => handleOptionChange(index, true)}
                                />
                                <Form.Check
                                    type="radio"
                                    name={`question-${question.id}`}
                                    label="False"
                                    checked={question.answer === false}
                                    onChange={() => handleOptionChange(index, false)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={handleAddQuestionsToAssessment}>Submit Questions</Button>
        </>
    );
}

export default TrueFalse;