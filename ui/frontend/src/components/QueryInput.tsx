import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

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

  useEffect(() => {
    const handleScrollToQuery = (e: any) => {
      if (e.detail === 'scrollToQuery') {
        const querySection = document.getElementById('query-section');
        querySection?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('customEvent', handleScrollToQuery);
    return () => window.removeEventListener('customEvent', handleScrollToQuery);
  }, []);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.answer || 'No response received');
    } catch (error) {
      setResponse('⚠️ Something went wrong.');
    }

    setLoading(false);
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-white px-4 py-16 overflow-hidden">
      {/* Decorative Sides */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-b from-blue-800/10 via-transparent to-purple-800/10 blur-2xl" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-t from-purple-800/10 via-transparent to-blue-800/10 blur-2xl" />

      <div id="query-section" className="relative z-10 p-6 max-w-2xl mx-auto space-y-6">
        {/* Title */}
        <h2 className="text-3xl text-blue-500 font-bold tracking-wide mb-4 drop-shadow-sm text-center">
          🧭 Ask Your Vaasthu Query
        </h2>

        {/* Input & Suggestions */}
        <div className="bg-white border border-white/10 rounded-3xl shadow-2xl p-6 space-y-4 transition-all duration-300">
          {/* Input */}
          <textarea
            rows={2}
            placeholder="Type your Vaasthu question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500 resize-none text-base font-medium shadow-sm"
          />

          {/* Suggestions */}
          <div className="space-y-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(s)}
                className="w-full flex justify-between items-center text-left px-4 py-2 rounded-xl transition-all group bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 hover:border-black"
              >
                <span className="text-sm font-medium group-hover:text-black/80">{s}</span>
                <Search className="w-4 h-4 text-gray-400 group-hover:text-black" />
              </button>
            ))}
          </div>
        </div>

        {/* Ask Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow transition-all duration-300"
        >
          {loading ? 'Thinking...' : 'Ask Vaasthu'}
        </button>

        {/* Response Box */}
        {response && (
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg border border-gray-200 space-y-2">
            <p className="text-sm text-gray-500">Vaasthu Response</p>
            <p className="leading-relaxed text-base font-medium whitespace-pre-line">
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryInput;
