"use client";
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';
import Name3D from '../../components/Name3D';
import { useTheme } from '../../context/ThemeContext';
import LetterGlitch from '../../components/LetterGlitch';
import { Playfair_Display } from 'next/font/google';
import { useRouter } from "next/navigation";
import DarkVeil from '@/components/DarkVeil';
import { Suspense } from "react";
import SearchScrollHandler from '../../components/SearchScrollHandler';


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const Portfolio = () => {
  type VisibilityState = {
    hero : boolean;
    about : boolean;
    contact : boolean;
  };

  const { darkMode } = useTheme(); // Correctly destructuring darkMode
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<VisibilityState>({hero:false,about:false,contact:false,});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showNavbar, setShowNavbar] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const router = useRouter();
  const { toggleDarkMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        setShowNavbar(scrollPosition > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    'Python', 'SQL', 'React', 'Next.js','Pandas', 'NumPy','HTML','SymPy','Java','JavaScript'
  ];

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try{
      const res = await fetch("/api/contact",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if(!res.ok) throw new Error("Failed");

      alert("NEW HANDLER WORKING !");
      setFormData({name: "", email:"", message:""});
    }catch(err){
      alert("Something went wrong. Please try again.")
    }
  };

  const theme = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900';

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const accentColor = darkMode ? "text-blue-700" : "text-blue-700";
  const buttonBg = darkMode ? 'bg-blue-600 hover:bg-blue-900' : 'bg-blue-600 hover:bg-blue-900';

  const goToProjects = () => {
    setCurrentPage("projects");
    setMobileMenuOpen(false);
    router.push("/projects");
  };


  return (
    <div className={`min-h-screen ${theme} transition-colors duration-300`}>
      <Suspense fallback={null}>
        <SearchScrollHandler />
      </Suspense>
      <div>
          <>
            <section
                id="hero"
                className="min-h-screen  flex flex-col lg:flex-row items-center justify-center px-6 overflow-hidden pl-6 pr-6"
                data-animate
              >
              <div className={`transition-all w-[100%] duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className='h-[300px] lg:h-[350px] w-full max-w-full lg:w-[550px] lg:mt-0 lg:hidden'>
                  <div className="max-[900px]:h-[300px] w-full lg:w-[600px] overflow-hidden">
                    <div className="h-[450px] sm:h-[550px] w-full lg:w-[550px] mt-0 lg:hidden">
                      <Name3D />
                    </div>
                  </div>
                </div>
                <div className='h-[300px] lg:h-[350px] w-full max-w-full pl-8 max-[1200px]:pl-0 lg:mt-0 hidden lg:block '>
                  <div className='leading-none text-[120px] font-bold text-blue-800 pt-10 mb-12 text-left max-[1100px]:z-[2] max-[1200px]:w-[100%] max-[1200px]:text-center'>
                      <div className={playfair.className}>DAHAM</div>
                      <div className={playfair.className}>ABEYRATNE</div>
                  </div>
                </div>
                <p className={`text-1xl sm:text-xl max-[1200px]:pl-0 max-[1200px]:text-center md:text-xl pl-10 mb-4 font-semibold opacity-50 ${darkMode ? 'text-blue-400' : 'text-black'}`}>
                  Bsc(Hons) AI and Data Science
                </p>
                <p className={`text-lg sm:text-xl max-[1200px]:pl-0 max-[1200px]:text-center  md:text-2xl mb-12 z-1000 pl-10 ml-0 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
                  Solving problems with data and intelligent systems
                </p>
                <div className="flex pl-10 max-[1200px]:pl-0 max-[1200px]:justify-center flex-col items-center lg:items-right lg:flex-row gap-4 w-[100%]">
                  <button
                    onClick={goToProjects}
                    className={`${buttonBg} text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 max-[1030px]:w-[80%] shadow-lg z-1000`}
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => router.push(`/?scroll=contact`)}
                    className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white px-8 py-4 rounded-lg font-semibold max-[1030px]:w-[80%] text-lg transition-all duration-300 transform hover:scale-105 shadow-lg z-1000`}
                  >
                    Contact Me
                  </button>
                </div>
              </div>
              <div className={`w-[100%] flex justify-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hidden min-[1200px]:flex `}>
                <div className="relative w-[75%] h-[350px] border-0 rounded-xl overflow-hidden transition-colors duration-300">
                  <LetterGlitch
                    glitchSpeed={70}
                    centerVignette={false}
                    outerVignette={true}
                    smooth={true} 
                    glitchColors={['#2b4539', '#61dca3', '#61b3dc']} 
                    characters={'ABCDEFGHIJKLMNOPQRSTUVWXYZ'}          
                  />
                </div>
              </div>
            </section>
            {/* <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20 pointer-events-none'}`}>
              <Navbar />
            </div> */}
            <section id="about" className="py-20 px-4 pt-[100px] min-h-screen pb-[100px]" data-animate>
              <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-200 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h2>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className={`${darkMode? '':''} rounded-xl shadow-2xl`}>
                    <div>
                      <div className="w-75 h-75 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl font-bold text-white">
                        <img src={`${basePath}/dp.png`} width={300} height={300} className="rounded-full object-cover border-1 border-0 shadow-lg" alt="Profile picture"/>
                      </div>
                    </div>
                  </div>
                  <div className='sm:text-justify text-left mt-8'>
                    <p className='p-[8px]'>I&apos;m a passionate Data Science and AI student dedicated to leveraging machine learning and artificial intelligence to solve real world problems. With a strong foundation in mathematics and programming, I create intelligent systems that transform data into actionable insights.</p>
                    <p className='p-[8px]'>My journey in AI has equipped me with expertise in deep learning, natural language processing, and computer vision. I thrive on building end to end solutions that bridge the gap between cutting edge research and practical applications.</p>
                    {/* <DecryptedText
                      text=""
                      animateOn="view"
                      revealDirection="start"
                      repeatOnView={false}
                      sequential={true}
                      speed={5}
                      className="lg:text-lg mb-8 leading-relaxed sm:text-justify text-left"
                    />
                    <div className='pt-4'>
                      <DecryptedText
                        text=""
                        animateOn="view"
                        revealDirection="start"
                        repeatOnView={false}
                        sequential={true}
                        speed={8}
                        className="lg:text-lg mb-8 leading-relaxed lg:text-justify text-left"
                      />
                    </div> */}
                    <h3 className="text-2xl font-bold mb-6 mt-8">Skills & Technologies</h3>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'} px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-300 hover:scale-110`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className='relative'>
              <div className="w-full h-[900px] max-[900px]:h-[1300px] absolute overflow-hidden">
                <div className='h-[950px] max-[900px]:h-[1300px] opacity-[50%]'>
                  <DarkVeil />
                </div>
              </div>
            </div>
            <section id="contact" className="py-20 max-[900px]:px-0 max-[900px]:pl-[3%] max-[900px]:pr-[3%] px-4 pb-[85px] mt-[50px] pt-[100px]" data-animate>
              <div className={`max-w-5xl mx-auto w-[100%] transition-all duration-1000 delay-300 mb-[45px] ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-18 pt-[10px] text-center ">Get In Touch</h2>
                <div className="grid md:grid-cols-2 place-items-center  min-[900px] max-[900px]:gap-10">
                  <div className={`${cardBg} rounded-2xl p-8 shadow-2xl`}>
                    <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <button
                        type="submit"
                        className={`w-full ${buttonBg} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                  <div className={`${cardBg} max-w-md  rounded-2xl p-8 min-[900px]:p-10px shadow-2xl flex flex-col justify-center`}>
                    <h3 className="text-2xl font-bold mb-6 pl-2 pb-4 ">Connect With Me</h3>
                    <div className="space-y-4">
                      <a href="mailto:dahamabeyratney@gmail.com" className={`flex items-center space-x-4 p-4 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition`}>
                        <Mail className={accentColor} size={24} />
                        <span>dahamabeyratney@gmail.com</span>
                      </a>
                      <a href="https://github.com/Daham-abeyratne" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-4 p-4 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition`}>
                        <Github className={accentColor} size={24} />
                        <span>github.com/Daham-abeyratne</span>
                      </a>
                      <a href="https://www.linkedin.com/in/daham-abeyratne/" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-4 p-4 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition`}>
                        <Linkedin className={accentColor} size={24} />
                        <span>linkedin.com/daham-abeyratne</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
      </div>
    </div>
  );
};

export default Portfolio;