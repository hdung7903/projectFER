import { useState } from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from "../redux/actions/userActions";

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
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          if (response.data.length > 0) {
            dispatch(loginUser(username));
            localStorage.setItem('username', username);
            toast.success("Login successful");
            navigate('/');
          } else {
            toast.error("Invalid username or password");
          }
        } else {
          toast.error("Unexpected response from the server");
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        toast.error("An error occurred during login");
      });
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicusername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="password-toggle">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </Form.Group>
            <Button
              className={username&& password ? "active" : " "}
              disabled={username && password ? false : true}
              type="submit" 
              variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginHandle