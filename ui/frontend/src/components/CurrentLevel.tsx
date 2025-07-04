import React from 'react';
import { MessageSquare, Clock, CheckCircle } from 'lucide-react';

const CurrentLevel = () => {
  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Your Personal Vaasthu Advisor
            <span className="block text-facebook-blue">Available 24/7</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed sf-pro-text">
            Our AI-powered assistant instantly answers Vaasthu-related queries, helping you place rooms, objects, and decisions in alignment with ancient wisdom — all within seconds.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="scroll-fade">
            <div className="bg-gray-900/50 rounded-3xl p-10 border border-gray-800">
              <div className="flex items-center gap-4 mb-8">
                <MessageSquare className="w-8 h-8 text-white/80" />
                <span className="text-2xl font-bold text-white">Live Demo</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-gray-800 rounded-2xl p-4 max-w-sm">
                    <p className="text-gray-300 sf-pro-text">Where should I place my kitchen according to Vaasthu?</p>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-end">
                  <div className="bg-white/90 text-black rounded-2xl p-4 max-w-sm">
                    <p className="text-sm sf-pro-text font-medium">According to Vaasthu principles, the kitchen should ideally be placed in the southeast corner of your home. This direction is governed by Agni (fire element)...</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-gray-800 rounded-2xl p-4 max-w-sm">
                    <p className="text-gray-300 sf-pro-text">What about the main entrance?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scroll-fade space-y-8">
            <div className="flex items-start gap-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <Clock className="w-8 h-8 text-white/80" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Instant Responses</h3>
                <p className="text-gray-400 text-lg sf-pro-text">Get answers to complex Vaasthu questions in seconds, not days.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <CheckCircle className="w-8 h-8 text-white/80" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Accurate Guidance</h3>
                <p className="text-gray-400 text-lg sf-pro-text">Built on authentic Vaasthu principles with modern AI understanding.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="bg-white/10 rounded-2xl p-4">
                <MessageSquare className="w-8 h-8 text-white/80" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Natural Conversation</h3>
                <p className="text-gray-400 text-lg sf-pro-text">Ask questions the way you naturally think about your home.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentLevel;