import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QueryInput from './components/QueryInput';
import CurrentLevel from './components/CurrentLevel';
import Roadmap from './components/Roadmap';
import Differentiators from './components/Differentiators';
import InteractivePreview from './components/InteractivePreview';
import About from './components/About';
import Footer from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <QueryInput />
      <CurrentLevel />
      <Roadmap />
      <Differentiators />
      <InteractivePreview />
      <About />
      <Footer />
    </div>
  );
}

export default App;