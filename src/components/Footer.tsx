import React from 'react';
import { Instagram, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Email telah terkirim!"); 
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-start">
          
          <div className="flex flex-col items-start">
             <img 
                src="/https://res.cloudinary.com/dvvr41ybq/image/upload/v1764206195/logo3dev_dp5wnh.gif" 
                alt="3D Logo Animation"
                className="w-72 h-auto max-w-full object-contain" 
              />
          </div>

          <div className="flex flex-col items-start pt-2">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-purple-500 font-serif">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium text-left">
              <li><Link to="/faq" className="hover:text-purple-500 transition-colors uppercase">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-purple-500 transition-colors uppercase">Shipping</Link></li>
              <li><Link to="/size-guide" className="hover:text-purple-500 transition-colors uppercase">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-purple-500 transition-colors uppercase">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-start pt-2">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-purple-500 font-serif">Menu</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium text-left">
              {/* 2. GANTI a href DENGAN Link to */}
              <li>
                <Link to="/" className="hover:text-purple-500 transition-colors uppercase">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-purple-500 transition-colors uppercase">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-500 transition-colors uppercase">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-500 transition-colors uppercase">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start pt-2">
            <h4 className="font-bold mb-6 text-sm tracking-widest uppercase text-purple-500 font-serif">Join the Cult</h4>
            
            <div className="flex gap-4 mb-6">
              <a 
                href="https://www.instagram.com/evlogins.project"
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-500 transition-colors cursor-pointer"
                title="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            
            <p className="text-gray-400 text-sm mb-2">Get notified on new drops.</p>
            
            <form 
              onSubmit={handleEmailSubmit}
              className="mt-2 flex w-full max-w-xs border-b-2 border-gray-700 hover:border-purple-500 focus-within:border-purple-500 transition-colors"
            >
              <input 
                type="email" 
                placeholder="ENTER EMAIL" 
                required
                className="bg-transparent border-none outline-none flex-grow py-2 text-sm text-white placeholder-gray-600 font-bold uppercase text-left"
              />
              <button 
                type="submit" 
                className="pl-3 pr-1 text-gray-400 hover:text-purple-500 transition-colors flex items-center justify-center group"
                title="Send Email"
              >
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
          <p>&copy; 2025 Evlogins Project. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="cursor-pointer hover:text-purple-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="cursor-pointer hover:text-purple-500 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
