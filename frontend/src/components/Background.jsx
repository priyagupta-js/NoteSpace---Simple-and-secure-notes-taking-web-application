import React from "react";
import { Edit3 } from "lucide-react";

export default function Background() {
  return (
    <>
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 via-pink-200/30 to-orange-200/30 animate-pulse"></div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-3xl backdrop-blur-sm rotate-12 animate-float"></div>

      <div className="absolute bottom-32 left-12 w-24 h-24 bg-purple-300/30 rounded-full backdrop-blur-sm animate-float-delayed"></div>

      <div className="absolute top-32 right-32 w-20 h-20 bg-green-300/30 rounded-full backdrop-blur-sm animate-float"></div>

      <div className="absolute bottom-40 right-20 w-28 h-28 bg-pink-300/30 rounded-2xl backdrop-blur-sm rotate-45 animate-float-delayed"></div>

      {/* Floating Icon */}
      <div className="absolute top-48 right-1/4 opacity-60 animate-float-delayed">
        <Edit3 size={48} className="text-white/50" strokeWidth={1.5} />
      </div>
    </>
  );
}
