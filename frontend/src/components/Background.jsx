import React from "react";
import { Edit3 } from "lucide-react";

export default function AuthBackground() {
  return (
    <>
      {/* Soft animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 via-pink-200/30 to-orange-200/30 animate-pulse"></div>

      {/* Floating shapes - auto scale on mobile */}
      <div className="absolute top-10 left-6 md:top-20 md:left-20 
                      w-20 h-20 md:w-32 md:h-32 
                      bg-white/20 rounded-3xl backdrop-blur-sm rotate-12 animate-float"></div>

      <div className="absolute bottom-24 left-4 md:bottom-32 md:left-12 
                      w-16 h-16 md:w-24 md:h-24 
                      bg-purple-300/30 rounded-full backdrop-blur-sm animate-float-delayed"></div>

      <div className="absolute top-24 right-10 md:top-32 md:right-32 
                      w-14 h-14 md:w-20 md:h-20 
                      bg-green-300/30 rounded-full backdrop-blur-sm animate-float"></div>

      <div className="absolute bottom-28 right-10 md:bottom-40 md:right-20 
                      w-20 h-20 md:w-28 md:h-28 
                      bg-pink-300/30 rounded-2xl rotate-45 backdrop-blur-sm animate-float-delayed"></div>

      {/* Pencil Icon */}
      <div className="absolute top-40 right-12 md:top-48 md:right-1/4 opacity-60 animate-float-delayed">
        <Edit3 size={40} className="text-white/50 md:w-12 md:h-12" strokeWidth={1.5} />
      </div>
    </>
  );
}
