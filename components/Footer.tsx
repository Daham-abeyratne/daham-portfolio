"use client";

import { useTheme } from "../context/ThemeContext";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-white text-black'} backdrop-blur-sm shadow-[0_-5px_15px_rgba(0,0,0,0.25)] transition-colors duration-300 py-8s pb-10 pt-10`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-4">&copy; 2025 Daham Abeyratne. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-400 transition"
            aria-label="Visit GitHub profile"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-400 transition"
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="mailto:your.email@example.com" 
            className="hover:text-gray-400 transition"
            aria-label="Send email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}