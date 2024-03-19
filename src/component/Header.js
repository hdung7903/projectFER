import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faBook, faUserCircle, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../redux/actions/userActions";

function Header() {
  const navigate = useNavigate();
  const { username, auth } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('username');
    dispatch(logoutUser());
    navigate('/');
    toast.success("Logged out successfully!");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/"><FontAwesomeIcon icon={faBook} />{" "}Education Online</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {auth && (
              <>
                <NavLink to="/" className="nav-link">
                  <FontAwesomeIcon icon={faHome} /> Home
                </NavLink>
                <NavLink to="/course" className="nav-link">
                  <FontAwesomeIcon icon={faBook} /> Course
                </NavLink>
                <NavLink to="/assessment" className="nav-link">
                  <FontAwesomeIcon icon={faTasks} /> Assessment
                </NavLink>                
              </>
            )}
          </Nav>
          <Nav>
            {auth ? (
              <NavDropdown title={<span><FontAwesomeIcon icon={faUserCircle} /> {username}</span>} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink to="/login" className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
