import React from 'react';
import { Clock, Brain, Lightbulb, Compass } from 'lucide-react';

const Differentiators = () => {
  const points = [
    {
      icon: Clock,
      title: "Saves weeks of architectural time",
      description: "Transform complex design decisions from weeks to seconds",
      color: "text-white/80 bg-white/10"
    },
    {
      icon: Brain,
      title: "RAG based and advanced AI techniques",
      description: "Combines cutting-edge retrieval systems with authentic Vaasthu knowledge",
      color: "text-white/80 bg-white/10"
    },
    {
      icon: Lightbulb,
      title: "Simple enough for anyone to use",
      description: "No architectural background needed — just ask naturally",
      color: "text-white/80 bg-white/10"
    },
    {
      icon: Compass,
      title: "Combines tradition with tech — beautifully",
      description: "Respects ancient wisdom while embracing modern innovation",
      color: "text-white/80 bg-white/10"
    }
  ];

  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Why This Changes
            <span className="block text-facebook-blue">Everything</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto sf-pro-text">
            We're not just building another tool — we're revolutionizing how people approach home design.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {points.map((point, index) => (
            <div 
              key={index} 
              className="scroll-fade group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gray-900/50 rounded-3xl p-10 border border-gray-800 card-hover h-full">
                <div className={`${point.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">{point.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg sf-pro-text">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;