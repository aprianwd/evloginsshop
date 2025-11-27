import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import logoImg from '/headerlogo.png';

const Header: React.FC = () => {
  const { toggleCart, cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // --- 1. STATE UNTUK SEARCH ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
  ];

  // --- LOGIKA HANDLING USER ---
  const handleUserIconClick = () => {
    if (user) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/login');
  };

  // --- 2. FUNGSI HANDLING SEARCH ---
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    if (searchQuery.trim()) {
      // Arahkan ke halaman shop dengan query parameter
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false); // Tutup input search setelah submit
      setSearchQuery(""); // (Opsional) Kosongkan input
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* LOGO IMAGE */}
        <Link to="/" className="flex items-center justify-center">
          <img 
            src={logoImg} 
            alt="EVLOGINS" 
            className="h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav (Sembunyikan jika Search sedang aktif agar rapi) */}
        {!isSearchOpen && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-400'
                }`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </nav>
        )}

        {/* Icons Group */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* --- 3. IMPLEMENTASI SEARCH BAR --- */}
          <div className="hidden sm:block relative">
            {isSearchOpen ? (
              <form 
                onSubmit={handleSearchSubmit} 
                className="flex items-center bg-white/10 rounded-full px-3 py-1 border border-white/20 animate-fade-in"
              >
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-white text-sm w-40 placeholder-gray-400"
                  onBlur={() => {
                    // Opsional: Tutup jika klik di luar (tapi hati-hati conflict dengan tombol submit)
                    // setIsSearchOpen(false); 
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-red-400 ml-2"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white" 
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
          </div>
          {/* -------------------------------- */}

          {/* Cart Icon */}
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative text-white" 
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* USER ICON */}
          <div className="relative">
            <button 
              onClick={handleUserIconClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white flex items-center gap-2"
              aria-label="Account"
            >
              <User size={20} />
              {user && <span className="text-xs font-bold hidden lg:block max-w-[100px] truncate">{user.name}</span>}
            </button>

            {/* Dropdown Menu User */}
            {showProfileMenu && user && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-md shadow-xl py-2 flex flex-col z-50">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                </div>
                
                {user.role === 'admin' ? (
                  <Link 
                    to="/admin/dashboard" 
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary text-left transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/orders" 
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary text-left transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    My Orders
                  </Link>
                )}

                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-400 hover:bg-white/5 text-left flex items-center gap-2 mt-1 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-white/10 py-4 px-4 flex flex-col gap-4 shadow-lg animate-fade-in bg-[#1a1a1a]">
          {/* MOBILE SEARCH ADDED */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-4 pr-10 text-white focus:outline-none focus:border-primary"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
              <Search size={18} />
            </button>
          </form>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-lg font-medium py-2 border-b border-white/5 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
             <button 
               onClick={handleLogout}
               className="text-lg font-medium py-2 text-red-400 text-left"
             >
               Logout ({user.name})
             </button>
          ) : (
             <Link 
               to="/login"
               className="text-lg font-medium py-2 text-primary"
               onClick={() => setIsMenuOpen(false)}
             >
               Login / Register
             </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;