import LandingPage from './components/landing-page.tsx';
import Dashboard from './components/dashboard.tsx';
import ModifyPage from './components/prof-dashboard.tsx';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

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
              path="/prof-dashboard" 
              element={
                <>
                  <SignedIn>
                      <ModifyPage />
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
