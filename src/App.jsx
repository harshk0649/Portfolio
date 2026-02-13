import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LifeJourney from './pages/LifeJourney';

function App() {
  return (
    <Router basename="/Portfolio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mylife" element={<LifeJourney />} />
      </Routes>
    </Router>
  );
}

export default App;
