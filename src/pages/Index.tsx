import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-white to-cyan-100 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-700 to-cyan-600 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Choose an option below to get started with your account
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-medium px-8 py-3">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-cyan-300 text-cyan-700 hover:bg-cyan-50 font-medium px-8 py-3 bg-transparent"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
