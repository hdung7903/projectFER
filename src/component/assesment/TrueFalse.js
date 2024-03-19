import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

function TrueFalse({ setQuestions }) {
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [localQuestions, setLocalQuestions] = useState([]);

    const handleTotalQuestionChange = (event) => {
        setTotalQuestions(parseInt(event.target.value, 10) || 0);
    };

    const handleQuestionTextChange = (index, text) => {
        const updatedQuestions = [...localQuestions];
        updatedQuestions[index].text = text;
        setLocalQuestions(updatedQuestions);
    };

    const handleOptionChange = (index, answer) => {
        const updatedQuestions = [...localQuestions];
        updatedQuestions[index].answer = answer;
        setLocalQuestions(updatedQuestions);
    };

    const addQuestions = () => {
        const newQuestions = [];
        for (let i = 0; i < totalQuestions; i++) {
            newQuestions.push({
                id: i + 1,
                text: '',
                answer: '',
            });
        }
        setLocalQuestions(newQuestions);
    };

    useEffect(() => {
        setQuestions(localQuestions);
    }, [localQuestions, setQuestions]);

    return (
        <>
            <Form.Label htmlFor="totalQuestionsTF">Number of True/False Questions</Form.Label>
            <Form.Control
                type="number"
                id="totalQuestionsTF"
                value={totalQuestions}
                onChange={handleTotalQuestionChange}
            />
            <Button variant="primary" onClick={addQuestions} style={{ marginBottom: '10px', marginTop: '10px' }}>
                Add Questions
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {localQuestions.map((question, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
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
        </>
    );
}

export default TrueFalse;