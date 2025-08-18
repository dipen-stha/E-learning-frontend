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

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 to-cyan-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-cyan-600">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-gray-600">
              We've sent a password reset link to {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Link to="/login" className="w-full">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-medium py-2.5">
                Back to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-cyan-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-cyan-600 bg-clip-text text-transparent">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-medium py-2.5"
            >
              Send Reset Link
            </Button>
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-medium text-cyan-700 hover:text-cyan-800 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
