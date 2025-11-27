import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Headers'; 
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AnnouncementBar from './components/AnnouncementBar';

// --- IMPORT HALAMAN ---
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Orders from './pages/Orders.tsx'; // <--- 1. IMPORT HALAMAN ORDERS

// --- IMPORT CONTEXT ---
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext'; // <--- 2. IMPORT PROVIDER

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {/* 3. WRAP APLIKASI DENGAN ORDER PROVIDER */}
          <OrderProvider>
            
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              
              <AnnouncementBar /> 

              <Header />

              <CartDrawer />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* Route Login */}
                  <Route path="/login" element={<Login />} />

                  {/* 4. UPDATE ROUTE ORDERS */}
                  {/* Sekarang mengarah ke komponen Orders.tsx yang kita buat */}
                  <Route path="/orders" element={<Orders />} />

                  {/* Route Admin (Placeholder sementara) */}
                  <Route path="/admin/dashboard" element={<div className="pt-32 text-center text-white">Admin Dashboard Area</div>} />
                </Routes>
              </main>
              <Footer />
            </div>

          </OrderProvider>
          {/* Akhir Wrap OrderProvider */}
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;