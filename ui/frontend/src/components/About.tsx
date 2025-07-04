import React from 'react';
import { Zap, Target, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about-section" className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              The Future of Architecture
              <span className="block text-facebook-blue">Is Here</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white/80" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400 text-lg sf-pro-text">Complex architectural decisions resolved in seconds, not weeks of consultation.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white/80" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Precision Driven</h3>
              <p className="text-gray-400 text-lg sf-pro-text">Every recommendation backed by authentic Vaasthu principles and modern AI accuracy.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white/80" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Future Ready</h3>
              <p className="text-gray-400 text-lg sf-pro-text">Continuously evolving with cutting-edge AI to serve millions of homeowners.</p>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-3xl p-10 border border-gray-800 text-center">
            <blockquote className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed mb-6 sf-pro-text max-w-4xl mx-auto">
              "Ancient wisdom meets cutting-edge AI. We're making architectural intelligence accessible to everyone, transforming how people design their homes."
            </blockquote>
            
            <div className="flex items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span className="text-base sf-pro-text">AI Powered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span className="text-base sf-pro-text">Tradition Meets Tech</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span className="text-base sf-pro-text">Built for Scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;