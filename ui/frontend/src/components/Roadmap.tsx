import React from 'react';
import { Upload, Wand2, Infinity, ArrowRight } from 'lucide-react';

const Roadmap = () => {
  const levels = [
    {
      level: 2,
      title: "Smart Floor Plan Analysis",
      description: "Upload your 2D floor plan. Let AI detect flaws and suggest changes in seconds.",
      icon: Upload,
      color: "bg-white/10",
      delay: "0s"
    },
    {
      level: 3,
      title: "Auto-Generated Designs",
      description: "Describe your needs. Get Vaasthu-compliant floor plans auto-generated.",
      icon: Wand2,
      color: "bg-white/10",
      delay: "0.2s"
    },
    {
      level: "∞",
      title: "Unlimited Possibilities",
      description: "Empowering every homeowner with architectural clarity — without waiting for days.",
      icon: Infinity,
      color: "bg-white/10",
      delay: "0.4s"
    }
  ];

  return (
    <section id="roadmap-section" className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            The Journey Has
            <span className="block text-gradient">Just Begun</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto sf-pro-text">
            We're building the future of architectural design, one AI breakthrough at a time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {levels.map((level, index) => (
            <div 
              key={index} 
              className="scroll-fade relative group"
              style={{ animationDelay: level.delay }}
            >
              <div className="bg-gray-900/50 rounded-3xl p-10 border border-gray-800 card-hover h-full">
                <div className={`${level.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <level.icon className="w-10 h-10 text-white/80" />
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 mb-3 sf-pro-text">Level {level.level}</div>
                  <h3 className="text-2xl font-bold text-white mb-6">{level.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg sf-pro-text">{level.description}</p>
                </div>
              </div>
              
              {index < levels.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;