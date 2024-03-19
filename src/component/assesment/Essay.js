import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

function Essay({ setQuestions }) {
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

    const addQuestions = () => {
        const newQuestions = [];
        for (let i = 0; i < totalQuestions; i++) {
            newQuestions.push({
                id: i + 1,
                text: '',
            });
        }
        setLocalQuestions(newQuestions);
    };

    useEffect(() => {
        setQuestions(localQuestions);
    }, [localQuestions, setQuestions]);

    return (
        <>
            <Form.Label htmlFor="totalQuestionsEssay">Number of Essay Questions</Form.Label>
            <Form.Control
                type="number"
                id="totalQuestionsEssay"
                value={totalQuestions}
                onChange={handleTotalQuestionChange}
            />
            <Button variant="primary" onClick={addQuestions} style={{ marginBottom: '10px', marginTop: '10px' }}>
                Add Questions
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                    </tr>
                </thead>
                <tbody>
                    {localQuestions.map((question, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={question.text}
                                    onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Essay;