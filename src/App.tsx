import { Routes, Route, Navigate } from "react-router-dom"
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


function App() {
  const {fetchSelf, isLoading } = useUserStore();
  const hasFetched = useRef(false);
 
    useEffect(() => {
      if (!hasFetched.current) {
        hasFetched.current = true;
        fetchSelf();
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
      </Routes>
    </div>
  )
}

export default App
