import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
function Assessment() {
    const [assessments, setAssessments] = useState([]);
    const [assessTypes, setAssessTypes] = useState([]);

    useEffect(() => {
        fetchAssessment();
    }, [])
    const navigate = useNavigate();

    const deleteAssessment = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/assessments/${id}`);
            // Update the assessments state by filtering out the deleted assessment
            setAssessments(assessments.filter((assessment) => assessment.id !== id));
        } catch (error) {
            console.error('Error deleting assessment:', error);
        }
    };

    const fetchAssessment = async () => {
        try {
            const [assessmentsResponse, assessTypesResponse] = await Promise.all([
                axios.get('http://localhost:8000/assessments'),
                axios.get('http://localhost:8000/assess-type')
            ]);

            setAssessments(assessmentsResponse.data);
            setAssessTypes(assessTypesResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const navigateToUpdatePage = (id) => {
        navigate(`/update-assessment/${id}`);
    };

    return (
        <>
            <h2>Assessment List</h2>
            <Button><Link to="/add-question" className='text-decoration-none text-white'>Add Assessment</Link></Button>
            <Table striped bordered hover>
                <thead>
                    <th>No</th>
                    <th>Name</th>
                    <th>Create Date</th>
                    <th>Type</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {assessments.map((assessment) => {
                        const assessType = assessTypes.find((type) => type?.id === assessment?.typeId);
                        return (
                            <tr key={assessment.id}>
                                <td>{assessment.id}</td>
                                <td>{assessment.name}</td>
                                <td>{formatDate(assessment.createDate)}</td>
                                <td>{assessType ? assessType.type : 'Unknown'}</td>
                                <td>
                                    <Button onClick={() => navigateToUpdatePage(assessment.id)}>Update</Button>{' '}
                                    <Button onClick={() => deleteAssessment(assessment.id)} variant="danger">Delete</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default Assessment;
