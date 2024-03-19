import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faBookOpen, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { ThemeContext } from '../App';

function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Helmet>
        <title>Online Education System</title>
      </Helmet>
      <Container className="pt-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Welcome to Our Online Education System</h1>
            <p>Explore a wide range of courses and expand your knowledge at your own pace.</p>
            <Button variant="primary">Discover Courses</Button>
          </Col>
          <Col md={6}>
            <img src="https://via.placeholder.com/500x300" alt="Education" className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" />
                <Card.Title>Expert Instructors</Card.Title>
                <Card.Text>
                  Learn from industry experts who are passionate about teaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FontAwesomeIcon icon={faBookOpen} size="3x" />
                <Card.Title>Unlimited Access</Card.Title>
                <Card.Text>
                  Choose what you'd like to learn from our extensive subscription library.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <FontAwesomeIcon icon={faUserGraduate} size="3x" />
                <Card.Title>Certificate of Completion</Card.Title>
                <Card.Text>
                  Show off your skills with a personal certificate after course completion.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className={`text-center p-5 ${theme}`}>
        <Row>
          <Col>
            <h2>Join Our Community</h2>
            <p>Become a part of a growing community of learners and educators.</p>
            <Button variant="success">Sign Up Today</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
