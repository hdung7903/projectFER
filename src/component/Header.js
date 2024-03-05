import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser}  from "../redux/actions/userActions";

function Header() {

  const navigate = useNavigate();
  const { username, auth } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('username');
    dispatch(logoutUser());
    navigate('/');
    toast.success("Log out success!");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink to="/" className="mx-3">
              Home
            </NavLink>
          </Nav>
          <Nav>
            {auth ? (
              <NavDropdown title={username} id="user-dropdown" align="end">
                <NavDropdown.Divider />
                <NavLink onClick={handleLogOut}>Logout</NavLink>
              </NavDropdown>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
