import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CreditCard, Shield, Lock } from "lucide-react";
import { CreateModal } from "@/components/Modal";
import { ModalCompProps } from "@/services/types/Extras";
import { useState } from "react";

export const EnrollCourse = ({ onSubmit, isOpen, onCancel }: ModalCompProps) => {
  const [selectedPlan, setSelectedPlan] = useState("full");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const courseData = {
    id: 1,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    instructorImage: "/placeholder.svg?height=60&width=60",
    instructorBio:
      "Senior Frontend Developer at Google with 8+ years of React experience",
    duration: "8 hours",
    rating: 4.8,
    students: 1234,
    image: "/react-course-thumbnail.png",
    price: "$89",
    originalPrice: "$129",
    description:
      "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Build production-ready applications with confidence.",
    features: [
      "Lifetime access to course materials",
      "Certificate of completion",
      "Direct instructor support",
      "30-day money-back guarantee",
      "Mobile and desktop access",
      "Downloadable resources",
    ],
    curriculum: [
      { title: "React Hooks Deep Dive", duration: "45 min", lessons: 6 },
      {
        title: "Context API & State Management",
        duration: "60 min",
        lessons: 8,
      },
      { title: "Performance Optimization", duration: "50 min", lessons: 7 },
      { title: "Testing React Applications", duration: "40 min", lessons: 5 },
      { title: "Advanced Patterns", duration: "55 min", lessons: 9 },
      { title: "Real-world Project", duration: "90 min", lessons: 12 },
    ],
    skills: [
      "React Hooks",
      "Context API",
      "Performance",
      "Testing",
      "TypeScript",
      "Next.js",
    ],
    requirements: [
      "Basic React knowledge",
      "JavaScript ES6+",
      "HTML & CSS fundamentals",
    ],
  };

  const plans = [
    {
      id: "full",
      name: "Full Course Access",
      price: "$89",
      originalPrice: "$129",
      features: [
        "Complete course content",
        "Lifetime access",
        "Certificate of completion",
        "Direct instructor support",
        "All downloadable resources",
      ],
      popular: true,
    },
    {
      id: "basic",
      name: "Basic Access",
      price: "$59",
      originalPrice: "$89",
      features: [
        "Core course content",
        "6 months access",
        "Basic support",
        "Essential resources",
      ],
      popular: false,
    },
  ];

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
  const handleFormSubmit = () => {
    onSubmit();
    setSelectedPlan
  };

  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onClose={onCancel}
        title="Complete Your Enrollment"
        width="3xl"
        actions={[]}
      >
        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Course Summary */}
          <Card className="bg-gradient-to-br from-violet-50 to-cyan-50 border-violet-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={courseData.image || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {courseData.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    by {courseData.instructor}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                      {selectedPlanData?.name}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    {selectedPlanData?.price}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {selectedPlanData?.originalPrice}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Method
            </h3>
            <div className="grid gap-3">
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-violet-300 bg-gradient-to-br from-violet-50 to-cyan-50"
                    : "border-gray-200 hover:border-violet-200"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === "card"
                        ? "border-violet-600 bg-violet-600"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <CreditCard className="w-5 h-5 text-violet-600" />
                  <span className="font-medium text-gray-800">
                    Credit/Debit Card
                  </span>
                </div>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "paypal"
                    ? "border-violet-300 bg-gradient-to-br from-violet-50 to-cyan-50"
                    : "border-gray-200 hover:border-violet-200"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === "paypal"
                        ? "border-violet-600 bg-violet-600"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "paypal" && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                    P
                  </div>
                  <span className="font-medium text-gray-800">PayPal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Card Information
              </h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  Secure Payment
                </p>
                <p className="text-xs text-emerald-600">
                  Your payment information is encrypted and secure
                </p>
              </div>
              <Lock className="w-4 h-4 text-emerald-600 ml-auto" />
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Course Price</span>
              <span className="text-gray-800">
                {selectedPlanData?.originalPrice}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-600">Discount (31% OFF)</span>
              <span className="text-emerald-600">-$40</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold border-t border-gray-200 pt-2">
              <span className="text-gray-800">Total</span>
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                {selectedPlanData?.price}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <Button className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold py-3 text-lg" onClick={handleFormSubmit}>
            <Lock className="w-4 h-4 mr-2" />
            Complete Payment
          </Button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By completing your purchase, you agree to our{" "}
            <span className="text-violet-600 hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-violet-600 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </CreateModal>
    </>
  );
};
