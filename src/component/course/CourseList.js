import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { fetchCourses, deleteCourse } from '../../redux/actions/courseActions';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faChalkboardTeacher, faVideo } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.courses);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleDeleteConfirmation = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId))
      .then(() => {
        dispatch(fetchCourses());
        toast.success("Course deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course.");
      });
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (selectedCourseId) {
      handleDelete(selectedCourseId);
    }
  };

  const handleCreateCourse = () => {
    navigate('/course/create');
  };

  const renderTooltip = (props, text) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  return (
    <>
      <Container className="pt-5">
        <Row className="justify-content-md-center mb-4">
          <Col md={8} className="text-center">
            <h1>Welcome to Our Online Education System</h1>
            <p>Discover courses, expand your knowledge, and achieve your learning goals.</p>
            <Button variant="success" onClick={handleCreateCourse} className="mr-2">
              <FontAwesomeIcon icon={faPlus} /> Add Course
            </Button>
            <Button variant="info" onClick={() => navigate('/video/add')} className='mx-4'>
              <FontAwesomeIcon icon={faVideo} /> Add Video
            </Button>
          </Col>
        </Row>
        <Row>
          {courses.map(course => (
            <Col md={4} key={course.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/course/info/${course.id}`} style={{ textDecoration: 'none' }}>
                      {course.title}
                    </Link>
                  </Card.Title>
                  <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, "Edit Course")}>
                    <Button variant="outline-primary" className="m-1" onClick={() => navigate(`/course/edit/${course.id}`)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, "Delete Course")}>
                    <Button variant="outline-danger" className="m-1" onClick={() => handleDeleteConfirmation(course.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete Course</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseList;
