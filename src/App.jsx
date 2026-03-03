import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LifeJourney from './pages/LifeJourney';
import ResumeViewer from './pages/ResumeViewer';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mylife" element={<LifeJourney />} />
        <Route path="/resume" element={<ResumeViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
