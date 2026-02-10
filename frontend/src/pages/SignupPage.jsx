import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  MessageCircle,
  Loader2,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl lg:max-w-5xl bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="grid lg:grid-cols-2 h-full">
          {/* LEFT – FORM */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Chatify</h1>
            </div>

            {/* Heading */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Create your account
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Join us and start chatting securely
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* FULL NAME */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 sm:py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-slate-400 text-sm sm:text-base mt-6 sm:mt-8">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-colors"
              >
                Login
              </Link>
            </p>
          </div>

          {/* RIGHT – ILLUSTRATION/HERO */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Simple. Secure. Fast.
              </h3>
              <p className="text-slate-300 text-center max-w-xs sm:max-w-sm mx-auto mb-8 text-sm sm:text-base">
                Experience modern real-time chat with privacy and performance in mind.
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm">End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm">Real-time messaging</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm">File sharing</span>
                </div>
              </div>

              {/* Illustration Image */}
              <div className="w-64 h-64 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                <img
                  src="/signup.png"
                  alt="Signup illustration"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;