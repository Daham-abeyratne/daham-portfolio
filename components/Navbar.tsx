"use client";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import GlassSurface from "./GlassSurface";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  // const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const accentColor = "text-blue-700";

  const goToProjects = () => {
    // setCurrentPage("projects");
    setMobileMenuOpen(false);
    router.push("/projects");
  };

  // const goToHome = (sectionId?: string) => {
  //   setMobileMenuOpen(false);
    
  //   router.push("/");
  //   setCurrentPage("home");
    
  //   if (sectionId) {
  //     setTimeout(() => {
  //       // const element = document.getElementById(sectionId);
  //       // if (element) {
  //       //   element.scrollIntoView({ behavior: "smooth" });
  //       // }
  //       scrollToSection(sectionId);
  //     }, 100);
  //   }
  // };

  // const scrollToSection = (sectionId: string) => {
  //   if (currentPage === "home") {
  //     const element = document.getElementById(sectionId);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //     setMobileMenuOpen(false);
  //   } else {
  //     goToHome(sectionId);
  //   }
  // };

  const navigateWithHash = (hash?: string) => {
    setMobileMenuOpen(false);

    if (hash) {
      router.push(`/?scroll=${hash}`);
    } else {
      router.push("/");
    }
  };


  return (
    <nav 
      className={`fixed top-[20px] left-[10%] right-[10%] w-[80%] max-[900px]:w-[90%] max-[900px]:left-[5%] max-[900px]:right-[5%] z-50 backdrop-blur-[10px] transition-colors duration-300  border-0 rounded-xl`}
    >
      <GlassSurface 
        darkMode={darkMode}
        className={`transition-colors duration-300 border-0 ${
          mobileMenuOpen ? 'rounded-xl' : 'rounded-xl'
        }`}
      >  
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between pl-[30px] items-center h-13">
            {/* Portfolio on the left */}
            <div className={`text-2xl font-bold ${accentColor}`}>Portfolio</div>

            {/* Desktop Menu */}
            <div className="hidden min-[900px]:flex space-x-15 pr-[20px] items-center">
              <button
                onClick={() => navigateWithHash("hero")}
                className={`hover:text-gray-600 transition ${darkMode  ? 'text-white' : 'text-blue-700' }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateWithHash("about")}
                className={`hover:text-gray-600 transition ${darkMode  ? 'text-white' : 'text-blue-700' }`}
              >
                About
              </button>
              <button
                onClick={goToProjects}
                className={`hover:text-gray-600 transition ${darkMode  ? 'text-white' : 'text-blue-700' }`}
              >
                Projects
              </button>
              <button
                onClick={() => navigateWithHash("contact")}
                className={`hover:text-gray-600 transition ${darkMode  ? 'text-white' : 'text-blue-700' }`}
              >
                Contact
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="min-[900px]:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-400" : "bg-gray-600"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 ${darkMode? "text-white":"text-black"}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </GlassSurface>

      {/* Mobile Menu - Separate GlassSurface below */}
      {mobileMenuOpen && (
        <GlassSurface
          darkMode={darkMode}
          className={`mt-1 backdrop-blur-sm transition-all duration-300 border-0 rounded-b-xl min-[900px]:hidden`}
        >
          <div className="w-full px-4 py-3 space-y-1 items-center justify-center flex flex-col">
            <button
              onClick={() => navigateWithHash("hero")}
              className={`block w-full text-left px-3 py-2 items-center justify-center flex rounded-lg ${darkMode  ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100' } transition`}
            >
              Home
            </button>
            <button
              onClick={() => navigateWithHash("about")}
              className={`block w-full text-left px-3 py-2 rounded-lg items-center justify-center flex hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode  ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100' } transition`}
            >
              About
            </button>
            <button
              onClick={goToProjects}
              className={`block w-full text-left px-3 py-2 rounded-lg items-center justify-center flex hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode  ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100' } transition`}
            >
              Projects
            </button>
            <button
              onClick={() => navigateWithHash("contact")}
              className={`block w-full text-left px-3 py-2 rounded-lg items-center justify-center flex hover:bg-gray-100 dark:hover:bg-gray-700 ${darkMode  ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100' } transition`}
            >
              Contact
            </button>
          </div>
        </GlassSurface>
      )}
    </nav>
  );
}