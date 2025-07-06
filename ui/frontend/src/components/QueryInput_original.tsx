import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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
    el.style.height = Math.min(el.scrollHeight, 64) + 'px';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-16 overflow-hidden">
      {/* Sides */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-b from-blue-800/10 via-transparent to-purple-800/10 blur-2xl" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-t from-purple-800/10 via-transparent to-blue-800/10 blur-2xl" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div id="query-section" className="relative z-10 p-6 max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl text-blue-500 font-bold tracking-wide mb-4 text-center animate-fade-in">
          🏛️ Ask Vaasthu Related Queries
        </h2>

        {/* Input Box */}
        <div className="bg-white/90 border border-white/10 rounded-3xl shadow-2xl p-6 space-y-4 animate-slide-up">
          <div className="relative">
            <textarea
              ref={textareaRef}
              placeholder="Type your Vaasthu question..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="w-full p-4 pr-16 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none text-base font-medium shadow-sm bg-white text-black overflow-hidden"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '64px' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute top-2 right-14 text-sm text-gray-500 hover:text-black bg-gray-200 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!query.trim() || loading}
              className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-lg disabled:opacity-50"
              title="Submit"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="space-y-2 animate-fade-in">
              {filteredSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full text-left px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 hover:border-black transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Response Block */}
        {displayText && (
          <div
            ref={responseRef}
            className="bg-white text-black p-6 rounded-2xl shadow-lg border border-gray-200 space-y-3 animate-slide-up"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Vaasthu Response</p>
              <button onClick={handleCopy} className="text-xs text-gray-500 hover:text-black">
                📋 Copy
              </button>
            </div>
            <p className="text-base font-medium whitespace-pre-line">{displayText}</p>

            {/* Feedback Buttons */}
            {typingDone && (
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setFeedback('up')}
                  className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
                    feedback === 'up'
                      ? 'bg-green-100 border-green-300 scale-105'
                      : 'bg-gray-100 border-gray-200 hover:bg-green-50 hover:scale-105'
                  }`}
                  title="Helpful"
                >
                  👍
                  <span className="text-sm font-medium">Good</span>
                </button>
                <button
                  onClick={() => setFeedback('down')}
                  className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
                    feedback === 'down'
                      ? 'bg-red-100 border-red-300 scale-105'
                      : 'bg-gray-100 border-gray-200 hover:bg-red-50 hover:scale-105'
                  }`}
                  title="Not Helpful"
                >
                  👎
                  <span className="text-sm font-medium">Bad</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.4; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
      `}</style>
    </div>
  );
}

export default QueryInput;
