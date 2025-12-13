import React, { useEffect, useState } from "react";
import { ArrowLeft, Camera, Save, User, Mail, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [totalNotes, setTotalNotes] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch profile + notes count
  const fetchProfileData = async () => {
    try {
      const userRes = await api.get("/users/me");
      const notesRes = await api.get("/notes");

      setUser(userRes.data);
      setName(userRes.data.name || "");
      setTotalNotes(notesRes.data.length);
      setLoading(false);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Save updated name
  const handleSave = async () => {
    try {
      const res = await api.put("/users/me", { name });
      setUser(res.data);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md  shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white/60 backdrop-blur-xl border rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-full">
                <Camera className="text-white" />
              </div>
            </div>

            {/* Name */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-6 w-full text-center text-xl font-bold bg-transparent border-b-2 border-purple-400 focus:outline-none"
            />

            {/* Email */}
            <p className="text-gray-600 text-sm mt-2 flex items-center gap-1">
              <Mail size={14} /> {user.email}
            </p>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              <Save size={16} className="inline mr-1" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-xl border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                  <FileText />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Notes</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white/60 backdrop-blur-xl border rounded-3xl p-8 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Account Information</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl">
                <User size={18} />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl">
                <Mail size={18} />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
