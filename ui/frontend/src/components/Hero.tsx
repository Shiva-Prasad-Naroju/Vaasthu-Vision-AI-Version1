import React from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToQuery = () => {
    const querySection = document.getElementById('query-section');
    querySection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById('roadmap-section');
    roadmapSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/3 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/5 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-400/3 rounded-full blur-2xl animate-float-reverse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-400/4 rounded-full blur-xl animate-float"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern"></div>
        </div>
        
        {/* Pulsing light effects */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full animate-pulse-glow"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="animate-float mb-12">
          <div className="relative">
            <Bot className="w-20 h-20 mx-auto text-white/80 mb-8 animate-glow" />
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-white/10 rounded-full blur-xl animate-ping opacity-20"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight animate-title-reveal">
          <span className="inline-block animate-letter-float">V</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.1s'}}>a</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.2s'}}>a</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.3s'}}>s</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.4s'}}>t</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.5s'}}>h</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.6s'}}>u</span>
          <span className="inline-block mr-4"></span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.7s'}}>V</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.8s'}}>i</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '0.9s'}}>s</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '1.0s'}}>i</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '1.1s'}}>o</span>
          <span className="inline-block animate-letter-float" style={{animationDelay: '1.2s'}}>n</span>
          <span className="inline-block mr-4"></span>
          <span className="inline-block animate-letter-float text-gradient" style={{animationDelay: '1.3s'}}>A</span>
          <span className="inline-block animate-letter-float text-gradient" style={{animationDelay: '1.4s'}}>I</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-white mb-6 max-w-4xl mx-auto font-medium tracking-tight animate-fade-in-up" style={{animationDelay: '1.5s'}}>
          What Takes Days, Now Done in Seconds.
        </p>
        
        <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed sf-pro-text animate-fade-in-up" style={{animationDelay: '1.7s'}}>
          Revolutionary AI system that transforms complex architectural decisions into instant, intelligent solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '1.9s'}}>
          <button 
            onClick={scrollToQuery}
            className="apple-button group px-10 py-4 bg-white/90 text-black rounded-2xl font-semibold text-lg hover:bg-white transition-all duration-300 glow-effect flex items-center gap-3 animate-button-glow"
          >
            <Sparkles className="w-5 h-5 animate-sparkle" />
            Try VaasthuGPT
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={scrollToRoadmap}
            className="apple-button px-10 py-4 glass-effect text-white rounded-2xl font-medium text-lg hover:bg-white/10 transition-all duration-300"
          >
            See What's Coming
          </button>
        </div>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
    </section>
  );
};

export default Hero;