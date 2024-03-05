import './App.css';
import Header from './component/Header';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
