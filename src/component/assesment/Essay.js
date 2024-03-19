import { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import {toast} from 'react-toastify'
import axios from 'axios';
import uuid from 'react-uuid';

function Essay({ onSubmit }) {
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

    const addQuestions = () => {
        const newQuestions = [];
        for (let i = 0; i < totalQuestions; i++) {
            newQuestions.push({
                id: i+1,
                text: '',
            });
        }
        setQuestions(newQuestions);
    };



    const handleAddQuestionsToAssessment = () => {
        const filledQuestions = questions.filter(question => question.text.trim() !== '');
        onSubmit(filledQuestions); 
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
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question.id}</td>
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
            <Button onClick={handleAddQuestionsToAssessment}>Submit Questions</Button>
        </>
    );
}

export default Essay;