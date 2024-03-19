import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

function MultipleChoice({ setQuestions }) {
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [localQuestions, setLocalQuestions] = useState([]);

    const handleTotalQuestionChange = (event) => {
        setTotalQuestions(parseInt(event.target.value, 10) || 0);
    };

    const handleQuestionTextChange = (questionIndex, text) => {
        const updatedQuestions = localQuestions.map((q, i) => i === questionIndex ? { ...q, text: text } : q);
        setLocalQuestions(updatedQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const updatedQuestions = localQuestions.map((q, i) => i === questionIndex ? { ...q, options: [...q.options, ''] } : q);
        setLocalQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, text) => {
        const updatedQuestions = localQuestions.map((q, i) => i === questionIndex ? { ...q, options: q.options.map((o, j) => j === optionIndex ? text : o) } : q);
        setLocalQuestions(updatedQuestions);
    };

    const handleAnswerChange = (questionIndex, text) => {
        const updatedQuestions = localQuestions.map((q, i) => i === questionIndex ? { ...q, answer: text } : q);
        setLocalQuestions(updatedQuestions);
    };

    const addQuestions = () => {
        const newQuestions = Array.from({ length: totalQuestions }, (_, i) => ({
            id: i + 1,
            text: '',
            options: [''],
            answer: '',
        }));
        setLocalQuestions(newQuestions);
    };

    // When local state changes, lift state up
    React.useEffect(() => {
        setQuestions(localQuestions);
    }, [localQuestions, setQuestions]);

    return (
        <>
            <Form.Label htmlFor="totalQuestionsMC">Number of Questions</Form.Label>
            <Form.Control
                type="number"
                id="totalQuestionsMC"
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
                        <th>Options</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {localQuestions.map((question, qIndex) => (
                        <tr key={qIndex}>
                            <td>{qIndex + 1}</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                                />
                            </td>
                            <td>
                                {question.options.map((option, oIndex) => (
                                    <React.Fragment key={oIndex}>
                                        <Form.Control
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            style={{ marginBottom: '5px' }}
                                        />
                                    </React.Fragment>
                                ))}
                                <Button variant="secondary" size="sm" onClick={() => handleAddOption(qIndex)}>
                                    Add Option
                                </Button>
                            </td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={question.answer}
                                    onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                                >
                                    <option value="">Select Answer</option>
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
        </>
    );
}

export default MultipleChoice;