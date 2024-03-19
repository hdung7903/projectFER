import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button }  from 'react-bootstrap';
import { fetchCourses,deleteCourse } from '../../redux/actions/courseActions';
import { useNavigate } from 'react-router-dom';
function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses); 
  const navigate = useNavigate();

  useEffect((courseId) => {
    dispatch(fetchCourses());
    dispatch(deleteCourse(courseId))
  },[dispatch]);

  const handleEdit = (courseId) => {
    navigate(`/course/edit/${courseId}`); 
  };

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };
  return (
     <Container>
        {courses && courses.map((course) => (
          <Col sm={12} md={6} lg={4} key={course.id}>
            <Card>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Button onClick={() => handleEdit(course.id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(course.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Container>
  )
}

export default CourseList