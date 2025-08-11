import { Routes, Route, Navigate } from "react-router-dom"
import RootLayout from "./components/layouts/AuthLayout"
import HomePage from "@/pages/Index"
import LoginPage from "@/pages/auth/Login"
import SignupPage from "@/pages/auth/Signup"
import ForgotPasswordPage from "@/pages/auth/ForgotPassword"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootLayout><HomePage /></RootLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
