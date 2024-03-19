import { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from "../redux/actions/userActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons';

function LoginHandle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8000/users?username=${username}&password=${password}`)
      .then(response => {
        if (response.data.length > 0) {
            dispatch(loginUser(username));
            localStorage.setItem('username', username);
            toast.success("Login successful");
            navigate('/');
        } else {
            toast.error("Invalid username or password");
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        toast.error("An error occurred during login");
      });
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <Form onSubmit={handleLoginSubmit}>
                <h2 className="text-center mb-4">Sign In</h2>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                    </div>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </Form.Group>
                <Button
                  disabled={!username || !password}
                  type="submit" 
                  variant="primary" 
                  className="w-100"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginHandle;
