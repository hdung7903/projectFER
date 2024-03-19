import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Modal, Card, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Assessment() {
    const [assessments, setAssessments] = useState([]);
    const [assessmentTypes, setAssessmentTypes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteAssessmentId, setDeleteAssessmentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssessment();
    }, []);

    const confirmDelete = (id) => {
        setShowDeleteModal(true);
        setDeleteAssessmentId(id);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/assessments/${deleteAssessmentId}`);
            setAssessments(assessments.filter((assessment) => assessment.id !== deleteAssessmentId));
            setShowDeleteModal(false);
            toast.success('Assessment successfully deleted');
        } catch (error) {
            console.error('Error deleting assessment:', error);
            toast.error('Error deleting assessment');
        }
    };

    const fetchAssessment = async () => {
        try {
            const assessmentsResponse = await axios.get('http://localhost:8000/assessments');
            const assessmentTypesResponse = await axios.get('http://localhost:8000/assess-type');
            setAssessments(assessmentsResponse.data);
            setAssessmentTypes(assessmentTypesResponse.data);
        } catch (error) {
            console.log(error);
            toast.error('Error fetching assessments');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const navigateToUpdatePage = (id) => {
        navigate(`/update-assessment/${id}`);
    };

    const getAssessmentTypeName = (typeId) => {
        const type = assessmentTypes.find((t) => t.id === typeId);
        return type ? type.type : 'Unknown';
    };

    return (
        <Container className="pt-5">
            <Row className="mb-2 justify-content-between">
                <Col>
                    <h2>Assessment List</h2>
                </Col>
                <Col className="text-right">
                    <Link to="/add-question" className='btn btn-primary'>
                        <FontAwesomeIcon icon={faPlus} /> Add Assessment
                    </Link>
                </Col>
            </Row>
            <Card>
                <Card.Body>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Create Date</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessments.map((assessment, index) => (
                                <tr key={assessment.id}>
                                    <td>{index + 1}</td>
                                    <td>{assessment.name}</td>
                                    <td>{formatDate(assessment.createDate)}</td>
                                    <td>
                                        <Badge bg="info">{getAssessmentTypeName(assessment.typeId)}</Badge>
                                    </td>
                                    <td>
                                        <Button variant="outline-primary" className="mx-3" onClick={() => navigateToUpdatePage(assessment.id)}>
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => confirmDelete(assessment.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this assessment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Assessment;
