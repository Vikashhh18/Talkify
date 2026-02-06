import React, { useState } from "react";
import { Link, Navigate } from "react-router";
import {
  Mail,
  Lock,
  MessageCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/40">

        {/* LEFT – FORM */}
        <div className="bg-slate-900 p-8 sm:p-12">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="text-cyan-400" />
            <h1 className="text-xl font-semibold text-slate-200">Chatify</h1>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back 👋
          </h2>
          <p className="text-slate-400 mb-8">
            Login to continue chatting
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT – ILLUSTRATION */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/20 to-slate-900 p-10">
          <Sparkles className="text-cyan-400 w-12 h-12 mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            Simple. Secure. Fast.
          </h3>
          <p className="text-slate-300 text-center max-w-sm mb-6">
            Your conversations, protected and seamless.
          </p>

          <img
            src="/signup.png"
            alt="Login illustration"
            className="w-72 opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
