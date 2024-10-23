import LandingPage from './components/landing-page.tsx';
import Dashboard from './components/dashboard.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
