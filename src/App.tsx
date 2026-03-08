import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/studies" element={<div>Studies</div>} />
        <Route path="/instructors" element={<div>Instructors</div>} />
        <Route path="/reqwests" element={<div>Reqwests</div>} />
        <Route path="/login" element={<div>Login</div>} />
      </Routes>
    </Router>
  );
}

export default App;
