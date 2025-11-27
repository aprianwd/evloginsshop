import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ArrowLeft } from 'lucide-react'; // Icon panah untuk kembali

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth(); // Ambil fungsi dari context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Panggil fungsi login
    const success = await login(email, password);
    
    if (success) {
      // Cek apakah email mengandung kata 'admin' untuk redirect (Logika sederhana)
      // Nanti bisa diganti dengan cek role: if (user.role === 'admin') ...
      if (email.includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 animate-fade-in">
      
      {/* Tombol Kembali ke Toko */}
      <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Back to Store
      </Link>

      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Please enter your details.</p>
        </div>
        
        {/* Tampilkan Error jika login gagal */}
        {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 text-white p-3 rounded focus:outline-none focus:border-primary transition-colors"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 text-white p-3 rounded focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded transition-all duration-300 tracking-wide"
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;