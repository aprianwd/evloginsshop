export default function AnnouncementBar() {
  const textContent = (
    <div className="flex items-center mx-6">
       <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase font-sans">
          EVLOGINS PROJECT <span className="text-purple-500 mx-2">★</span> IT ALL STARTED FROM CULTURE
       </span>
    </div>
  );

  return (
    <div className="bg-black text-white border-b border-gray-800 py-3 overflow-hidden relative z-[60]">
      
      <div className="flex w-max animate-marquee hover:pause">
        <div className="flex">
           {textContent}
           {textContent}
           {textContent}
           {textContent}
        </div>
        <div className="flex">
           {textContent}
           {textContent}
           {textContent}
           {textContent}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}