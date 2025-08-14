
// This is updated one for query box, having color black but response white.

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const suggestions = [
  "Where should I locate the kitchen?",
  "Is northeast good for master bedroom?",
  "Can I build pooja room above toilet?",
  "What is the ideal location for study room?",
  "Where i should place the staircase?",
];

function QueryInput() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [feedback, setFeedback] = useState(null);
  const [typingDone, setTypingDone] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const typingTimeout = useRef(null);
  const responseRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!loading && response) {
      let i = 0;
      let current = '';
      setTypingDone(false);

      const interval = setInterval(() => {
        current += response.charAt(i);
        setDisplayText(current);
        i++;
        if (i >= response.length) {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [response, loading]);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    setDisplayText('');
    setShowSuggestions(false);
    setFeedback(null);
    setTypingDone(false);

    try {
      const res = await fetch('/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const answer = data.answer || 'No response received';
      setTimeout(() => {
        setResponse(answer);
      }, 100);

      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    } catch (error) {
      setResponse('⚠️ Something went wrong.');
    }

    setLoading(false);
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    setShowSuggestions(true);
    autoResize();
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }, 300);
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-16 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-emerald-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div id="query-section" className="relative z-10 p-6 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">AI-Powered Vaasthu Guidance</span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
            Balance Your Home with 
            <br />Just One Question
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Get instant, personalized Vaasthu advice for your dream home
          </p>
        </div>

        {/* Modern Input Container */}
        <div className="relative">
          <div className={`
            relative bg-white/5 backdrop-blur-xl border transition-all duration-500 rounded-3xl
            ${isFocused 
              ? 'border-blue-400/50 shadow-2xl shadow-blue-500/25' 
              : 'border-white/10 hover:border-white/20'
            }
          `}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {query.length}/200 characters
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  placeholder="What would you like to know about Vaasthu?"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-lg leading-relaxed pr-16"
                  rows={3}
                  maxLength={200}
                  style={{ minHeight: '96px', maxHeight: '128px' }}
                />
                
                {/* Animated Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!query.trim() || loading}
                  className={`
                    absolute bottom-0 right-0 p-3 rounded-2xl transition-all duration-300 
                    ${query.trim() 
                      ? 'bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 scale-100 opacity-100' 
                      : 'bg-gray-700 scale-90 opacity-50'
                    }
                    disabled:cursor-not-allowed group
                  `}
                  title="Ask Question"
                >
                  <ArrowRight className={`
                    w-5 h-5 text-white transition-transform duration-300
                    ${query.trim() ? 'group-hover:translate-x-0.5' : ''}
                  `} />
                </button>
              </div>

              {/* Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="mt-6 space-y-2">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                    Popular Questions
                  </div>
                  <div className="grid gap-2">
                    {filteredSuggestions.slice(0, 3).map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm text-gray-300 hover:text-white group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response Block */}
        {displayText && (
          <div
            ref={responseRef}
            className="bg-white/95 backdrop-blur-sm text-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200/50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">Vaasthu Response</span>
              </div>
              <button 
                onClick={handleCopy} 
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Copy
              </button>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-line">{displayText}</p>
            </div>

            {/* Feedback Buttons */}
            {typingDone && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setFeedback('up')}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300
                    ${feedback === 'up'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200'
                    }
                  `}
                >
                  <span className="text-lg">👍</span>
                  <span className="text-sm font-medium">Helpful</span>
                </button>
                
                <button
                  onClick={() => setFeedback('down')}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300
                    ${feedback === 'down'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200'
                    }
                  `}
                >
                  <span className="text-lg">👎</span>
                  <span className="text-sm font-medium">Not helpful</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        
        .animate-float { 
          animation: float 6s ease-in-out infinite; 
        }
        
        /* Hide browser's default clear button */
        textarea::-webkit-search-cancel-button,
        textarea::-webkit-search-decoration,
        textarea::-ms-clear {
          display: none;
        }
        
        textarea::-webkit-textfield-decoration-container {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default QueryInput;