import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.tsx';
import Login from './features/auth/Login.tsx';
import Signup from './features/auth/Signup.tsx';
import { NotFound, ServerDown, ServerError } from './pages/ErrorPages.tsx';
import TeacherCourseList from './pages/TeacherCourseList.tsx';
import TeacherCourseManagementPage from './pages/TeacherCourseManagementPage.tsx';
import StudentCoursesList from './pages/StudentCoursesList.tsx';
import CourseCatalogPage from './pages/CourseCatalogPage.tsx';
import LecturerRequestsPage from './pages/LecturerRequestsPage.tsx';
import CourseReportPage from './features/report/CourseReportPage.tsx';
import StudentExerciseList from './pages/StudentExerciseList.tsx';
import ExerciseWorkspace from './features/student-answer/ExerciseWorkspace.tsx';
import { store } from './app/store.ts';
import { showAlert } from './features/alert/alertSlice.ts';
import CustomAlert from './features/alert/CustomAlert.tsx';
import Home from './pages/HomePage.tsx';
import Footer from './components/footer/Footer.tsx';
import { useEffect } from 'react';

window.alert = (message: string) => {
  store.dispatch(showAlert({ message, type: 'info' }));
};

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/') {
      document.title = 'Home';
      return;
    }

    const fixedRoutes: { [key: string]: string } = {
      'studies': 'My Courses',
      'instructors': 'Instructors',
      'requests': 'Lecturer Requests',
      'login': 'Login',
      'signup': 'Sign Up',
      '404': 'Page Not Found',
      'error-500': 'Server Error',
      'server-down': 'Server Down',
      'course-catalog': 'Course Catalog',
    };

    const cleanPath = path.substring(1);

    if (fixedRoutes[cleanPath]) {
      document.title = fixedRoutes[cleanPath];
      return;
    }

    if (path.startsWith('/exercise/')) {
      document.title = 'Exercise Workspace'; 
      return;
    }
    
    if (path.startsWith('/course/')) {
      document.title = 'Course Exercises';
      return;
    }

    if (path.startsWith('/manage-course/')) {
      document.title = 'Course Management';
      return;
    }

    if (path.endsWith('/report')) {
      document.title = 'Course Report';
      return;
    }

    const fallbackTitle = cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
    document.title = fallbackTitle;

  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Navbar />
      <main className="pt-20">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/studies" element={<StudentCoursesList />} />
          <Route path="/course/:courseId" element={<StudentExerciseList />} />
          <Route path="/exercise/:exerciseId" element={<ExerciseWorkspace />} />
          <Route path="/instructors" element={<TeacherCourseList />} />
          <Route path="/requests" element={<LecturerRequestsPage />} />
          <Route path="/login" element={<div><Login /></div>} />
          <Route path="/signup" element={<div><Signup /></div>} />
          <Route path="/manage-course/:id" element={<TeacherCourseManagementPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/error-500" element={<ServerError />} />
          <Route path="/server-down" element={<ServerDown />} />
          <Route path="/course-catalog" element={<CourseCatalogPage />} />
          <Route path="/courses/:courseId/report" element={<CourseReportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer/>
      <CustomAlert />
    </Router>
  );
}

export default App;
