import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faBook, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../redux/actions/userActions";
import { ThemeContext } from '../App';
import ReactSwitch from 'react-switch';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
    <Navbar expand="lg" className={`bg-${theme === 'dark' ? 'dark' : 'light'}`}>
      <Container fluid>
        <Navbar.Brand href="/" className={theme === 'dark' ? 'text-light' : 'text-dark'}>
          <FontAwesomeIcon icon={faBook} />{' '}Education Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className={`me-auto my-2 my-lg-0 ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`} style={{ maxHeight: '100px' }} navbarScroll>
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
              <div className="d-flex align-items-center">
              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} className="me-4" />
              <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} className={`text-${theme === 'dark' ? 'light' : 'dark'}`} />} id="nav-dropdown" alignRight>
                <NavDropdown.Item className={`text-${theme === 'dark' ? 'dark' : 'light'}`} >{username}</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut} className={`text-${theme === 'dark' ? 'dark' : 'light'}`}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
