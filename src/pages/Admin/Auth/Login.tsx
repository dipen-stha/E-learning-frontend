import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
// import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useAuthStore } from "@/stores/User/Auth";
import { useUserStore } from "@/stores/User/User";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginDetails, setLoginDetails, adminLogin } = useAuthStore();
  const { fetchAdminSelf, isAdminAuthenticated } = useUserStore();
  const [loginPayload, setLoginPayload] = useState(loginDetails);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetails = { ...loginPayload, [name]: value };
    setLoginPayload(updatedDetails);
    setLoginDetails(updatedDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loggedIn = await adminLogin();
    if (loggedIn) {
      fetchAdminSelf();
      if (isAdminAuthenticated) {
        navigate("/admin/dashboard");
      }
    }
    setIsLoading(true);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-cyan-100 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-cyan-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-600">
              Sign in to manage your learning platform
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-gray-200 shadow-lg bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )} */}

              <div className="space-y-2">
                <Label htmlFor="text" className="text-gray-700">
                  Username
                </Label>
                <Input
                  id="userName"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={loginPayload.username}
                  onChange={handleChange}
                  className="bg-white border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    // type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPayload.password}
                    onChange={handleChange}
                    required
                    className="bg-white border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 pr-10"
                  />
                  {/* <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button> */}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 text-cyan-600 hover:text-cyan-700"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Demo credentials: admin@example.com / admin123</p>
            </div> */}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>© 2024 Digital Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
