import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Navbar, Modal } from 'react-bootstrap';
import { fetchCourses, deleteCourse } from '../../redux/actions/courseActions';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEdit = (courseId) => {
    navigate(`/course/edit/${courseId}`);
  };

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  // Modal state and functions
  const [showModal, setShowModal] = React.useState(false);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);

  const handleDeleteConfirmation = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedCourseId) {
      handleDelete(selectedCourseId);
    }
    setShowModal(false);
  };

  const handleCreateCourse = () => {
    navigate('/course/create');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Course Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Button variant="primary" onClick={handleCreateCourse} className="ml-auto">
            <FontAwesomeIcon icon={faPlus} /> Add Course
          </Button>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          {courses && courses.map((course) => (
            <Col sm={12} md={6} lg={4} key={course.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Button variant="outline-secondary" onClick={() => handleEdit(course.id)} className="m-1">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDeleteConfirmation(course.id)} className="m-1">
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default CourseList;