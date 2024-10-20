import LandingPage from './components/landing-page.tsx';
import Dashboard from './components/dashboard.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import DemoPage from './app/payments/page.tsx';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
