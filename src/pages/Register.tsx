import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Frontend sederhana
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Panggil fungsi register
    const success = await register(name, email, password);
    
    if (success) {
      alert("Registration Successful! Please Login.");
      navigate('/login'); // Redirect ke login agar user bisa masuk
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12 animate-fade-in">
      
      <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Back to Store
      </Link>

      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Join EVLOGINS for exclusive drops & rewards.</p>
        </div>
        
        {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/20 text-white p-3 rounded focus:outline-none focus:border-primary transition-colors"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
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
              placeholder="Min. 6 characters"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black border border-white/20 text-white p-3 rounded focus:outline-none focus:border-primary transition-colors"
              placeholder="Re-type password"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded transition-all duration-300 mt-4 tracking-wide"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;