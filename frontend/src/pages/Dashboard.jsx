import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, User, LogOut, X, Tag } from "lucide-react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const colors = [
  "from-yellow-100 to-yellow-200",
  "from-blue-100 to-blue-200",
  "from-pink-100 to-pink-200",
  "from-green-100 to-green-200",
  "from-purple-100 to-purple-200",
  "from-orange-100 to-orange-200",
  "from-teal-100 to-teal-200",
  "from-indigo-100 to-indigo-200",
];

const heights = ["h-44", "h-48", "h-52", "h-56", "h-60", "h-64"];

export default function Dashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const [search, setSearch] = useState("");

  //Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notes${search ? `?q=${search}` : ""}`);
      const backendNotes = res.data;

      const enhanced = backendNotes.map((n) => ({
        id: n._id,
        title: n.title,
        description: n.content,
        tags: n.tag ? n.tag.split(",").map((t) => t.trim()) : [],
        color: colors[Math.floor(Math.random() * colors.length)],
        height: heights[Math.floor(Math.random() * heights.length)],
      }));

      setNotes(enhanced);
    } catch (err) {
      console.log("Fetch Notes Error:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  //Open Create Note Modal
  const handleAddNote = () => {
    setEditingNote(null);
    setFormData({ title: "", description: "", tags: "" });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditNote = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      description: note.description,
      tags: note.tags.join(", "),
    });
    setShowModal(true);
  };

  // Delete Note
  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.log("Delete Error:", err.response?.data || err);
    }
  };

  // Save Note (Create / Update)
  const handleSaveNote = async () => {
    if (!formData.title.trim()) return;

    const payload = {
      title: formData.title,
      content: formData.description,
      tag: formData.tags, // DB expects single comma-separated string
    };

    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote.id}`, payload);
      } else {
        await api.post("/notes", payload);
      }

      setShowModal(false);
      fetchNotes();
    } catch (err) {
      console.log("Save Error:", err.response?.data || err);
    }
  };


  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white cursor-pointer font-bold text-lg">N</span>
            </div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text cursor-pointer text-transparent">
              NoteSpace
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by titles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-64 text-sm focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Link to="/profile"><User size={20} /></Link>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-2">My Notes</h2>
        <p className="text-gray-600 mb-6">Capture and organize your thoughts beautifully</p>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`break-inside-avoid shadow-md bg-linear-to-br ${note.color} ${note.height}
                         rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition group`}
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-bold">{note.title}</h3>

                {/* Edit/Delete Buttons */}
                <div className="flex space-x-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="p-1.5 bg-white/80 rounded-lg hover:bg-white"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1.5 bg-white/80 rounded-lg hover:bg-white"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-4">{note.description}</p>

              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/60 rounded-full text-xs font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={handleAddNote}
        className="fixed bottom-8 right-8 w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 
                   hover:scale-110 transition shadow-2xl rounded-full flex items-center justify-center"
      >
        <Plus size={28} />
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {editingNote ? "Edit Note" : "Create New Note"}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold mb-2 block">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/80 border rounded-xl focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-white/80 border rounded-xl focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 flex items-center">
                  <Tag size={16} className="mr-1" /> Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Work, Design, Ideas..."
                  className="w-full px-4 py-3 bg-white/80 border rounded-xl focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveNote}
                  className="flex-1 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition"
                >
                  Save Note
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* extra animations */}
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.25s ease-out; }
      `}</style>
    </div>
  );
}
