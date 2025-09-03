import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuthStore } from "@/stores/User/Auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/User/User";

const LoginPage: React.FC = () => {
  const { loginDetails, setLoginDetails, login } = useAuthStore();
  const { fetchSelf, isAuthenticated } = useUserStore();
  const [loginPayload, setLoginPaylod] = useState(loginDetails);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetails = { ...loginPayload, [name]: value };
    setLoginPaylod(updatedDetails);
    setLoginDetails(updatedDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loggedIn = await login();
    if (loggedIn) {
      fetchSelf();
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Username" className="text-gray-700 font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your Username"
                value={loginPayload.username}
                onChange={handleChange}
                className="border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                required
              />
            </div>
            <div className="space-y-2 focus:outline-none">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginPayload.password}
                onChange={handleChange}
                className="border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Checkbox
                id="remember"
                name="remember"
                checked={loginPayload.remember}
                onChange={handleChange}
                label="Remember me"
              />
              <Link
                to="/forgot-password"
                className="text-sm text-sky-700 hover:text-sky-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-3">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-medium py-2.5"
            >
              Sign In
            </Button>
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                to="/signup"
                className="font-medium text-cyan-700 hover:text-cyan-800 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
