import { Routes, Route } from 'react-router-dom';
import Home from '../component/Home';
import LoginHandle from '../component/Login';
import App from '../App';

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginHandle />} />
      </Route>
    </Routes>
  )
}

export default AppRoute