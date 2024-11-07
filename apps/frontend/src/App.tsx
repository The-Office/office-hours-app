import LandingPage from './components/landing-page.tsx';
import Dashboard from './components/dashboard.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Sign } from 'crypto';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <SignedOut>
                <LandingPage />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard" />
              </SignedIn>
            </>
            } />
          <Route 
              path="/dashboard" 
              element={
                <>
                  <SignedIn>
                      <Dashboard />
                  </SignedIn>
                  <SignedOut>
                      <Navigate to="/" />
                  </SignedOut>
                </>
              } />
          <Route
              path="*"
              element={
                <>
                  <SignedOut>
                    <Navigate to="/" />
                  </SignedOut>
                  <SignedIn>
                    <Navigate to="/dashboard" />
                  </SignedIn>
                </>
              }
            />
        </Routes>
      </Router>
    </>
  );
};

export default App;
