import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/main/MainLayout';
import AdminLayout from '../layouts/admin/AdminLayout';
import PrivateRoute from '../components/PrivateRoute';
import HomePage from '../pages/homepage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import PersonalTaskPage from '../pages/personal-tasks/PersonalTaskPage';
import CreateTaskPage from '../pages/personal-tasks/CreateTaskPage';
import TaskDetailPage from '../pages/personal-tasks/TaskDetailPage';
import TeamPage from '../pages/teams/TeamPage';
import TeamDetailPage from '../pages/teams/TeamDetailPage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import TeamManagementPage from '../pages/admin/TeamManagementPage';
import SystemSettingsPage from '../pages/admin/SystemSettingsPage';
import ProfilePage from '../pages/profile/ProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes with MainLayout */}
      <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<PersonalTaskPage />} />
        <Route path="tasks/create" element={<CreateTaskPage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="teams" element={<TeamPage />} />
        <Route path="teams/:id" element={<TeamDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Protected routes with AdminLayout */}
      <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="teams" element={<TeamManagementPage />} />
        <Route path="settings" element={<SystemSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 