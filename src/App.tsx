import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import Login from './features/auth/Login.tsx';
import Signup from './features/auth/Signup.tsx';
import { NotFound, ServerDown, ServerError } from './pages/ErrorPages.tsx';
import TeacherCourseList from './pages/TeacherCourseList.tsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/studies" element={<div>Studies</div>} />
        <Route path="/instructors" element={<TeacherCourseList />} />
        <Route path="/requests" element={<div>Requests</div>} />
        <Route path="/login" element={<div><Login /></div>} />
        <Route path="/signup" element={<div><Signup /></div>} />

        <Route path="/404" element={<NotFound />} />
        <Route path="/error-500" element={<ServerError />} />
        <Route path="/server-down" element={<ServerDown />} />
  
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
