import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import HomePage from "@/pages/Index"
import LoginPage from "@/pages/auth/Login"
import SignupPage from "@/pages/auth/Signup"
import ForgotPasswordPage from "@/pages/auth/ForgotPassword"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect, useRef } from "react"
import { useUserStore } from "./stores/User/User"
import GuestRoute from "./components/GuestRoute"
import Dashboard from "@/pages/Dashboard/Student/Dashboard"
import CourseDetails from "./pages/Course/CourseDetail"
import ContentPage from "./pages/Content/ContentPage"
import AdminLoginPage from "./pages/Admin/Auth/Login"
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard"
import AdminLayout from "./components/layouts/AdminLayout"
import UsersPage from "./pages/Admin/User/User";
import CoursesPage from "./pages/Admin/Course/Course"
import SubjectsPage from "./pages/Admin/Subject/Subject"

function App() {
  const {fetchSelf, fetchAdminSelf, isLoading } = useUserStore();
  const hasFetched = useRef(false);
  const location = useLocation()
 
    useEffect(() => {
      if (!hasFetched.current) {
        hasFetched.current = true;
        if(location.pathname.includes("/admin")){
          fetchAdminSelf();
        } else{
          fetchSelf();
        }
      }
    }, []);

  if(isLoading){
    return <div>Loading....</div>
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/course-detail/:course_id" element={<ProtectedRoute><CourseDetails/></ProtectedRoute>} />
        <Route path="/subject/:subject_id/contents" element={<ProtectedRoute><ContentPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin/login" element={<GuestRoute><AdminLoginPage /></GuestRoute>}/>
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><UsersPage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute><AdminLayout><CoursesPage/></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/subjects" element={<ProtectedRoute><AdminLayout><SubjectsPage /></AdminLayout></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App
