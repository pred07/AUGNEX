import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { WalletProvider } from './context/WalletContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import ModeratorLogin from './pages/ModeratorLogin';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

import LearningPaths from './pages/LearningPaths';
import ModuleDetail from './pages/ModuleDetail';
import Profile from './pages/Profile';
import ServiceRecord from './pages/ServiceRecord';
import ModulesLibrary from './pages/ModulesLibrary';
import PublicProfile from './pages/PublicProfile';
import AdminDashboard from './pages/AdminDashboard';

import Pricing from './pages/Pricing';

// const Modules = () => <h1 className="text-2xl font-orbitron">Modules</h1>;

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ProgressProvider>
            <WalletProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/moderator" element={<ModeratorLogin />} />

                {/* Public Landing Page */}
                <Route path="/" element={<Landing />} />

                {/* Protected Dashboard */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/paths" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <LearningPaths />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/modules" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ModulesLibrary />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/modules/:moduleId" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ModuleDetail />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />

                <Route path="/service-record" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ServiceRecord />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                {/* Public Profile Route - Accessible without login (theoretically) */}
                <Route path="/u/:publicId" element={
                  <MainLayout>
                    <PublicProfile />
                  </MainLayout>
                } />

                <Route path="/admin" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <AdminDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/subscription" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Pricing />
                    </MainLayout>
                  </ProtectedRoute>
                } />



                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </WalletProvider>
          </ProgressProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
