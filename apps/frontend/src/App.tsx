import LandingPage from './components/landing-page.tsx';
import Dashboard from './components/dashboard.tsx';
import AdminDashboard from './components/prof-dashboard.tsx';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from './services/userService.ts';

const App = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  });

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
                  {user ? (user.role == "student" ? <Dashboard /> : <AdminDashboard />) : <Navigate to="/" />}
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
                  <AdminDashboard />
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
