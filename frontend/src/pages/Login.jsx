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
    <div className="min-h-screen w-full relative overflow-hidden bg-linear-to-br from-cyan-200 via-blue-300 to-purple-400">
      <Background />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Glassmorphic Card */}
          <div
            className="relative backdrop-blur-xl bg-white/10 
                          rounded-[30px] sm:rounded-[40px] 
                          p-8 sm:p-12 shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <h1
                className="text-4xl sm:text-5xl font-bold mb-2 
                             bg-linear-to-r   from-purple-400 to-orange-300 
                             bg-clip-text text-transparent"
              >
                NoteSpace
              </h1>
              <p className="text-gray-700 text-xs sm:text-sm">
                Capture your thoughts beautifully.
              </p>
            </div>

            

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Email */}
              <div className="relative mb-5">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full bg-white/70 rounded-full 
                             pl-12 pr-5 py-3 sm:py-3.5
                             text-sm sm:text-base text-gray-700 
                             placeholder-gray-500 focus:ring-2 focus:ring-white/50"
                />
              </div>

              {/* Password */}
              <div className="relative mb-6">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={onChange}
                  className="w-full bg-white/70 rounded-full 
                             pl-12 pr-4 py-2.5 sm:py-3 
                             text-sm sm:text-base text-gray-700 
                             placeholder-gray-500 focus:ring-2 focus:ring-white/50"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-linear-to-r cursor-pointer from-purple-300 via-pink-300 to-orange-300 text-white font-semibold rounded-full py-2.5 sm:py-3 text-sm sm:text-base shadow-lg hover:scale-105 transition-transform"
              >
                {" "}
                Login{" "}
              </button>
            </form>
            {error && (
              <div className="text-center text-red-800 p-2 rounded-md text-sm mt-4">
                {error}
              </div>
            )}

            <p className="text-center mt-4 text-white text-xs sm:text-sm">
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
