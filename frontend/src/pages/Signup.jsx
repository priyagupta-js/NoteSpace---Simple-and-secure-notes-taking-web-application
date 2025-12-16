import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Background from "../components/Background";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  //NEW: loading state (same as Login page)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    //Prevent multiple clicks
    if (loading) return;

    setError("");
    setLoading(true); // 🔹 Start loading

    try {
      await api.post("/auth/signup", form);

      //After successful signup → redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false); //Stop loading
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-linear-to-br from-purple-200 via-blue-200 to-pink-300">
      <Background />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="relative backdrop-blur-xl bg-white/10 rounded-[40px] p-12 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-700 mt-2 text-sm">
                Join NoteSpace today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full bg-white/70 rounded-full pl-12 pr-4 py-3 text-gray-700"
                />
              </div>

              {/* Email */}
              <div className="relative">
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
                  required
                  className="w-full bg-white/70 rounded-full pl-12 pr-4 py-3 text-gray-700"
                />
              </div>

              {/* Password */}
              <div className="relative">
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
                  required
                  className="w-full bg-white/70 rounded-full pl-12 pr-4 py-3 text-gray-700"
                />
              </div>

              {/*UPDATED BUTTON WITH LOADING + CLICK FEEDBACK */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full bg-linear-to-r from-purple-300 via-pink-300 to-orange-300
                  text-white font-semibold rounded-full py-3 shadow-lg
                  transition-all duration-200
                  active:scale-95           /* 🔹 Tap animation */
                  hover:scale-105
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                `}
              >
                {loading ? (
                  <>
                    {/* 🔹 Spinner */}
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div className="text-center text-red-800 p-2 rounded-md text-sm mt-4">
                {error}
              </div>
            )}

            {/* Footer */}
            <p className="text-center mt-4 text-white text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
