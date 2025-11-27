import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Header Image */}
      <div className="w-full h-[60vh] relative">
         <img 
            src="https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022421/banner4_pfzyjs.png" 
            alt="About Studio" 
            className="w-full h-full object-cover contrast-105 brightness-100"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white font-serif text-6xl md:text-8xl font-bold uppercase tracking-tighter">ABOUT US</h1>
          </div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="prose prose-lg prose-invert mx-auto text-white-400">
          <h2 className="font-serif text-4xl text-purple-600 mb-6 uppercase font-bold">Born on the Concrete</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Evlogins Project wasn't started in a boardroom. It started in the streets, the skate parks, and the underground music venues of Makassar. Established in 2024, we represent the pulse of the city—raw, unfiltered, and constantly evolving.
          </p>
          <p className="mb-6 text-lg leading-relaxed">
            We don't just sell clothes; we sell a mindset. Our designs are heavily influenced by brutalist architecture, utilitarian function, and the rebellious spirit of youth culture. We bridge the gap between high fashion and everyday grit.
          </p>

          <h2 className="font-serif text-4xl text-purple-600 mb-6 uppercase font-bold">No Compromise</h2>
          <p className="text-lg leading-relaxed">
            Fast fashion is dead. We focus on heavy-weight fabrics, durable hardware, and cuts that stand out. Every piece is limited run. Once it's gone, it's gone. Join the movement or get left behind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;