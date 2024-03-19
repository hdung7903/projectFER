import { Routes, Route } from 'react-router-dom';
import Home from '../component/Home';
import LoginHandle from '../component/Login';
import App from '../App';
import PrivateRoute from './PrivateRoute';
import Assessment from '../component/Assessment';
import AssessmentForm from '../component/assesment/AssessmentForm';
import AssessmentEdit from '../component/assesment/AssessmentEdit';
import AddCourse from '../component/course/AddCourse';
import CourseList from '../component/course/CourseList';
import EditCourse from '../component/course/EditCourse';
import CourseInfo from '../component/course/CourseInfo';
import AddVideo from '../component/course/AddVideo';
function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route element={<PrivateRoute />}> 
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/add-question" element={<AssessmentForm />} />  
          <Route path="/update-assessment/:id" element={<AssessmentEdit />} />   
          <Route path="/course" element={<CourseList />} />
          <Route path="/course/info/:id" element={<CourseInfo />} />
          <Route path="/course/create" element={<AddCourse />} />          
          <Route path="/course/edit/:id" element={<EditCourse />} />
          <Route path="/video/add" element={<AddVideo />} />              
        </Route>
        <Route path="/login" element={<LoginHandle />} />
      </Route>
    </Routes>
  )
}

export default AppRoute