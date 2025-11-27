import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import logoImg from '../assets/headerlogo.png'; // Pastikan path logo sesuai

const Login: React.FC = () => {
  const navigate = useNavigate();
  // Ambil fungsi dari AuthContext
  const { login, register, user, error: authError } = useAuth();

  // Redirect jika user sudah login (misal mengetik URL /login manual)
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // State untuk Mode (true = Login, false = Register)
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // State Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // State Loading & Error Lokal
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError(''); // Hapus error saat mengetik
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');

    try {
      if (isLoginMode) {
        // --- MODE LOGIN ---
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/'); // Redirect ke Home
        } else {
          // Error akan otomatis terisi dari AuthContext (authError), 
          // tapi kita bisa set fallback
          if (!authError) setLocalError('Login failed. Check your email/password.');
        }
      } else {
        // --- MODE REGISTER ---
        // 1. Lakukan Register
        const successRegister = await register(formData.name, formData.email, formData.password);
        
        if (successRegister) {
          // 2. Jika sukses, langsung Auto Login agar UX mulus
          await login(formData.email, formData.password);
          navigate('/');
        } else {
          // Gagal register (misal email sudah ada)
           if (!authError) setLocalError('Registration failed.');
        }
      }
    } catch (err) {
      setLocalError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Tentukan pesan error mana yang ditampilkan (prioritas: Context > Lokal)
  const errorMessage = authError || localError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10 relative overflow-hidden">
      
      {/* Background Decoration (Blur Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-1xl animate-fade-in z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="Logo" className="h-12 w-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">
            {isLoginMode ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLoginMode 
              ? 'Enter your credentials to access your account' 
              : 'Join us today and start your journey'}
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input Name (Hanya muncul saat Register) */}
          {!isLoginMode && (
            <div className="animate-fade-in relative group">
              <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required={!isLoginMode}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}

          {/* Input Email */}
          <div className="relative group">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Input Password */}
          <div className="relative group">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded border border-red-500/20 animate-fade-in">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              <>
                {isLoginMode ? 'Sign In' : 'Sign Up'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setLocalError(''); // Clear error saat ganti mode
                setFormData({ ...formData, name: '' });
              }}
              className="text-primary hover:text-primary/80 font-bold transition-colors ml-1 hover:underline"
            >
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;