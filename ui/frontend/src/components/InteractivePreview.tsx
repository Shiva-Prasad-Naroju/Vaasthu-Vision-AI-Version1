import React from 'react';
import { Play, Sparkles } from 'lucide-react';

const InteractivePreview = () => {
  const scrollToQuery = () => {
    const querySection = document.getElementById('query-section');
    querySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Experience It
            <span className="block text-gradient">Yourself</span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto sf-pro-text">
            See how our AI transforms complex Vaasthu questions into instant, actionable insights.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-gray-900/50 rounded-3xl p-1 border border-gray-800">
              <div className="bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-700">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <Play className="w-8 h-8 text-white/80" />
                    </div>
                    <div className="absolute inset-0 bg-white/5 rounded-2xl animate-ping opacity-20"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Transform Your Home Design Process?
                </h3>
                
                <p className="text-gray-400 mb-8 text-base max-w-xl mx-auto sf-pro-text">
                  Join thousands of homeowners who've already experienced the future of Vaasthu guidance.
                </p>
                
                <button 
                  onClick={scrollToQuery}
                  className="apple-button group px-8 py-3 bg-white/90 text-black rounded-2xl font-semibold text-base hover:bg-white transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  Launch the Demo
                  <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePreview;