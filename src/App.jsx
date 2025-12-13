import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import LearningPaths from './pages/LearningPaths';
import ModuleDetail from './pages/ModuleDetail';
// const Modules = () => <h1 className="text-2xl font-orbitron">Modules</h1>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
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
                <LearningPaths />
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
