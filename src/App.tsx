import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Navigation from 'components/Navigation';

import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Settings from '../src/pages/Settings';
import LandingPage from '../src/pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/record" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
