import React from 'react';
import { Bot } from 'lucide-react';

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
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Bot className="w-10 h-10 text-white/80" />
              <span className="text-3xl font-black text-white">Vaasthu Vision AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg sf-pro-text">
              Revolutionizing traditional architecture with the power of artificial intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white transition-colors text-lg sf-pro-text text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToQuery}
                  className="text-gray-400 hover:text-white transition-colors text-lg sf-pro-text text-left"
                >
                  Try AI
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToRoadmap}
                  className="text-gray-400 hover:text-white transition-colors text-lg sf-pro-text text-left"
                >
                  Roadmap
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Connect</h3>
            <div className="text-gray-400 text-lg sf-pro-text">
              <span>Coming soon</span>
            </div>
          </div>
        </div>
        
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