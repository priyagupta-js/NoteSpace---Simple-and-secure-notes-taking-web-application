import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Background from "../components/Background";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-cyan-200 via-blue-300 to-purple-400">

      {/* Background Shapes */}
      <Background />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* Glassmorphic card */}
          <div className="relative backdrop-blur-xl bg-white/10 rounded-[40px] p-12 shadow-2xl border border-white/20">
            
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                NoteSpace
              </h1>
              <p className="text-white/80 text-sm">Capture your thoughts beautifully.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">

              {/* Email */}
              <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={18}  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email"
                  className="w-full bg-white/70 rounded-full pl-12 pr-4 py-3 focus:ring-2 focus:ring-white/50 text-gray-700"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full bg-white/70 rounded-full pl-12 pr-4 py-3 focus:ring-2 focus:ring-white/50 text-gray-700"
                />
              </div>
           {error && (
              <div className="bg-red-300/60 text-red-800 p-2 rounded-md text-sm mb-4">
                {error}
              </div>
            )}
              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 text-white font-semibold rounded-full py-3 shadow-lg hover:scale-105 transition-transform"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-4 text-white/90 text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
