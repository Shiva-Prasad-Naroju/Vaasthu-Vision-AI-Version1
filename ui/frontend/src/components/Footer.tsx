import React from 'react';
import { Bot, Linkedin, Github, Mail } from 'lucide-react';
import shivaImage from '../assets/shiva.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToQuery = () => {
    const querySection = document.getElementById('query-section');
    querySection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById('roadmap-section');
    roadmapSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-800 py-16">
      <div className="container mx-auto px-6">
        {/* Top section: responsive flex */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-12 mb-16">
          
          {/* 1️⃣ Image */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <img
              src={shivaImage}
              alt="Shiva Prasad Naroju"
              className="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-white shadow-2xl"
            />
          </div>

          {/* 2️⃣ Title + Description */}
          <div className="flex flex-col justify-start w-full md:max-w-lg text-center md:text-left">
            <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
              <Bot className="w-12 h-12 text-white/80" />
              <span className="text-3xl md:text-4xl font-black text-white">Vaasthu Vision AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg sf-pro-text">
              Revolutionizing traditional architecture with the power of artificial intelligence. ✨
            </p>
          </div>

          {/* 3️⃣ Quick Links */}
          <div className="flex-shrink-0 w-full md:w-auto text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors text-lg sf-pro-text">
                  Home
                </button>
              </li>
              <li>
                <button onClick={scrollToQuery} className="text-gray-400 hover:text-white transition-colors text-lg sf-pro-text">
                  Try AI
                </button>
              </li>
              <li>
                <button onClick={scrollToRoadmap} className="text-gray-400 hover:text-white transition-colors text-lg sf-pro-text">
                  Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* 4️⃣ Connect */}
          <div className="flex-shrink-0 w-full md:w-auto text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-6">Connect</h3>
            <div className="flex justify-center md:justify-start items-center gap-6">
              <a href="https://www.linkedin.com/in/shiva-prasad-naroju-4772a6184" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-400/50 text-blue-400 hover:text-white" title="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/Shiva-Prasad-Naroju" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-gray-500/50 text-gray-400 hover:text-white" title="GitHub">
                <Github className="w-6 h-6" />
              </a>
              <a href="mailto:shivanaroju26@gmail.com"
                 className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-400/50 text-red-400 hover:text-white" title="Mail">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-lg sf-pro-text">
            © 2025 Vaasthu Vision AI. Bridging ancient wisdom with modern technology.
          </p>
          <p className="text-gray-300 text-xl mt-3 font-semibold">
            A project by Shiva Prasad Naroju
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
