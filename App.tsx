import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ConsumerDashboard from './pages/ConsumerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from './components/AuthContext'; // Ensure useAuth is imported

// --- PROTECTED ROUTE --- //
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// --- APP --- //
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/consumer"
          element={<ProtectedRoute><ConsumerDashboard /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/shopkeeper"
          element={<ProtectedRoute><ShopkeeperDashboard /></ProtectedRoute>}
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
