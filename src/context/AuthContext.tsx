import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Definisikan Tipe User
interface User {
  id: string; // Ubah ke string agar mudah pakai Date.now()
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// 2. Definisikan Interface Context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- DUMMY DATA ---
// Kunci untuk menyimpan data di LocalStorage browser
const STORAGE_KEY_USERS = 'evlogins_users_db';
const STORAGE_KEY_CURRENT_USER = 'evlogins_current_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Cek status login saat aplikasi pertama kali dimuat (Refresh tidak logout)
  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (storedSession) {
      setUser(JSON.parse(storedSession));
    }
  }, []);

  // --- HELPER: Ambil semua user dari LocalStorage ---
  const getUsersFromStorage = (): any[] => {
    const users = localStorage.getItem(STORAGE_KEY_USERS);
    return users ? JSON.parse(users) : [];
  };

  // --- FUNGSI LOGIN (DUMMY) ---
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Simulasi delay jaringan agar terasa 'real'
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsersFromStorage();
        
        // Cari user yang cocok
        // Catatan: Di real app, password harus di-hash (tidak boleh plain text)
        // Tapi untuk dummy, kita simpan password apa adanya di object user sementara.
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        // Tambahkan "Backdoor" akun admin untuk testing cepat
        if (email === 'admin@admin.com' && password === 'admin123') {
           const adminUser: User = { id: 'admin-01', name: 'Super Admin', email, role: 'admin' };
           setUser(adminUser);
           localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(adminUser));
           setIsLoading(false);
           resolve(true);
           return;
        }

        if (foundUser) {
          // Buat object user tanpa password untuk session
          const sessionUser: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role
          };

          setUser(sessionUser);
          localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(sessionUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setError('Invalid email or password');
          setIsLoading(false);
          resolve(false);
        }
      }, 1000); // Delay 1 detik
    });
  };

  // --- FUNGSI REGISTER (DUMMY) ---
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsersFromStorage();

        // Cek apakah email sudah terdaftar
        const isExist = users.find((u: any) => u.email === email);

        if (isExist) {
          setError('Email is already registered');
          setIsLoading(false);
          resolve(false);
        } else {
          // Buat User Baru
          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // Disimpan plain text HANYA karena ini dummy/testing
            role: 'user' // Default role user biasa
          };

          // Simpan ke 'Database' LocalStorage
          users.push(newUser);
          localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

          setIsLoading(false);
          resolve(true);
        }
      }, 1000);
    });
  };

  // --- FUNGSI LOGOUT ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    // Kita TIDAK menghapus database users (STORAGE_KEY_USERS) agar data register tidak hilang
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};