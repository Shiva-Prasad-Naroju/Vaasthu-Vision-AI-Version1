import React, { useState, useEffect } from 'react';
import { Bot, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToQuery = () => {
    const querySection = document.getElementById('query-section');
    querySection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById('roadmap-section');
    roadmapSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Bot className="w-8 h-8 text-white/80" />
            <span className="text-xl font-bold text-white">Vaasthu Vision AI</span>
          </button>

          {/* Desktop Navigation - Moved to Right */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <button 
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium"
            >
              Home
            </button>
            <button 
              onClick={scrollToQuery}
              className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium"
            >
              Try AI
            </button>
            <button 
              onClick={scrollToRoadmap}
              className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium"
            >
              Roadmap
            </button>
            <button 
              onClick={scrollToAbout}
              className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium"
            >
              About
            </button>
            
            {/* CTA Button */}
            <button 
              onClick={scrollToQuery}
              className="apple-button px-6 py-2 bg-white/90 text-black rounded-xl font-semibold text-sm hover:bg-white transition-all duration-300 ml-4"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800 py-4">
            <div className="flex flex-col gap-4">
              <button 
                onClick={scrollToTop}
                className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={scrollToQuery}
                className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium text-left"
              >
                Try AI
              </button>
              <button 
                onClick={scrollToRoadmap}
                className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium text-left"
              >
                Roadmap
              </button>
              <button 
                onClick={scrollToAbout}
                className="text-gray-300 hover:text-white transition-colors sf-pro-text font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={scrollToQuery}
                className="apple-button px-6 py-2 bg-white/90 text-black rounded-xl font-semibold text-sm hover:bg-white transition-all duration-300 w-fit"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;