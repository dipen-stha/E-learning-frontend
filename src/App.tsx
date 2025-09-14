import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/Index";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Dashboard from "@/pages/Dashboard/Student/Dashboard";
import CourseDetails from "./pages/Course/CourseDetail";
import ContentPage from "./pages/Content/ContentPage";
import AdminLoginPage from "./pages/Admin/Auth/Login";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminLayout from "./components/layouts/AdminLayout";
import UsersPage from "./pages/Admin/User/User";
import CoursesPage from "./pages/Admin/Course/Course";
import SubjectsPage from "./pages/Admin/Subject/Subject";
import AuthLayout from "./components/layouts/AuthLayout";
import UnitsPage from "./pages/Admin/Content/Units/Unit";
import UnitContents from "./pages/Admin/Content/UnitContents/UnitContents";
import CustomToaster from "./components/ui/Toast";

function App() {
  return (
    <div className="App">
      <CustomToaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course-detail/:course_id"
          element={
            <ProtectedRoute>
              <AuthLayout>
                <CourseDetails />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject/:subject_id/contents"
          element={
            <ProtectedRoute>
              <AuthLayout>
                <ContentPage />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin/login" element={<GuestRoute><AdminLoginPage /></GuestRoute>} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <UsersPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <CoursesPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <SubjectsPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/content/units"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <UnitsPage />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin/content/unit-contents"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <UnitContents />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
