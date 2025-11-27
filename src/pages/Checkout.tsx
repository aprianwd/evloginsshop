import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { type UserCheckoutDetails } from '../types';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle, Tag } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  
  // --- 1. STATE UNTUK PROMO CODE ---
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  const [formData, setFormData] = useState<UserCheckoutDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'midtrans' | 'xendit'>('midtrans');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- 2. LOGIKA PROMO CODE ---
  const handleApplyPromo = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah submit form utama
    
    // Daftar kode valid (Simulasi Backend)
    const validCodes: { [key: string]: { type: 'percent' | 'fixed', value: number } } = {
      'EVLOGINSFREE': { type: 'percent', value: 100 }, // Diskon 100%
      'HEMAT20': { type: 'fixed', value: 20000 }, // Potongan 20rb
    };

    const code = promoCode.toUpperCase().trim();

    if (validCodes[code]) {
      let discountAmount = 0;
      if (validCodes[code].type === 'percent') {
        discountAmount = cartTotal * validCodes[code].value;
      } else {
        discountAmount = validCodes[code].value;
      }

      // Validasi agar diskon tidak melebihi total
      if (discountAmount > cartTotal) discountAmount = cartTotal;

      setDiscount(discountAmount);
      setAppliedCode(code);
      setPromoMessage({ type: 'success', text: `Code ${code} applied successfully!` });
    } else {
      setDiscount(0);
      setAppliedCode('');
      setPromoMessage({ type: 'error', text: 'Invalid promo code.' });
    }
  };

  // --- 3. HITUNG TOTAL AKHIR ---
  const finalTotal = cartTotal - discount;

  // Mencegah akses checkout jika cart kosong
  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-serif mb-4">Your Cart is Empty</h2>
        <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary-hover">Continue Shopping</button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Simpan order dengan total yang sudah didiskon (finalTotal)
      addOrder(cart, finalTotal);

      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-surface border border-white/10 p-8 md:p-12 shadow-2xl shadow-primary/10 max-w-lg text-center animate-fade-in rounded-sm">
          <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-purple-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-white">Order Confirmed!</h2>
          <p className="text-gray-400 mb-8">
            Thank you for shopping with Evlogins Project. We have sent a confirmation email to <strong>{formData.email}</strong>.
          </p>
          
          <button 
            onClick={() => navigate('/orders')} 
            className="w-full bg-primary text-white py-3 font-medium hover:bg-primary-hover rounded-sm transition-colors mb-3"
          >
            View My Orders
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-transparent border border-white/10 text-gray-400 py-3 font-medium hover:text-white hover:border-white transition-colors rounded-sm"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center md:text-left text-white">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Section */}
        <div className="lg:w-2/3">
          <form onSubmit={handlePayment}>
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"><Truck size={20} className="text-primary" /> Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'].map((field) => (
                  <input
                    key={field}
                    required
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    value={formData[field as keyof UserCheckoutDetails]}
                    onChange={handleInputChange}
                    className={`bg-surface border border-white/10 text-white p-3 w-full outline-none focus:border-primary transition-colors rounded-sm placeholder-gray-600 ${
                      ['email', 'phone', 'address'].includes(field) ? 'md:col-span-2' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"><CreditCard size={20} className="text-primary" /> Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border p-4 cursor-pointer flex items-center gap-3 transition-colors rounded-sm ${
                    paymentMethod === 'midtrans' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/10 bg-surface hover:border-white/30'
                  }`}
                  onClick={() => setPaymentMethod('midtrans')}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'midtrans' ? 'border-primary' : 'border-gray-500'
                  }`}>
                    {paymentMethod === 'midtrans' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  </div>
                  <div>
                    <span className="font-bold block text-white">Midtrans</span>
                    <span className="text-xs text-gray-500">Credit Card, GoPay, VA</span>
                  </div>
                </div>
                <div 
                  className={`border p-4 cursor-pointer flex items-center gap-3 transition-colors rounded-sm ${
                    paymentMethod === 'xendit' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/10 bg-surface hover:border-white/30'
                  }`}
                  onClick={() => setPaymentMethod('xendit')}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'xendit' ? 'border-primary' : 'border-gray-500'
                  }`}>
                     {paymentMethod === 'xendit' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  </div>
                   <div>
                    <span className="font-bold block text-white">Xendit</span>
                    <span className="text-xs text-gray-500">Bank Transfer, E-Wallet</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tombol Pay menggunakan finalTotal */}
            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-primary text-white py-4 font-bold tracking-wide hover:bg-primary-hover disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center items-center gap-2 rounded-sm shadow-lg shadow-primary/20"
            >
              {isProcessing ? 'PROCESSING...' : `PAY Rp ${finalTotal.toLocaleString('id-ID')}`}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Secure Payment Encrypted
            </p>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3">
          <div className="bg-surface border border-white/10 p-6 sticky top-24 rounded-sm">
            <h3 className="font-serif text-xl font-bold mb-6 text-white">Order Summary</h3>
            
            {/* Product List */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                  <div className="flex gap-3">
                    <img src={item.images[0]} alt="product" className="w-12 h-16 object-cover bg-gray-900" />
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-gray-500">Size: {item.selectedSize} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-gray-300">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            {/* --- 4. INPUT PROMO CODE (BARU) --- */}
            <div className="mb-6 pt-2">
                <label className="text-xs text-gray-500 mb-2 block uppercase font-bold flex items-center gap-1">
                    <Tag size={12} /> Promo Code
                </label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="ENTER CODE"
                        className="flex-1 bg-transparent border border-white/20 rounded-sm px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors uppercase"
                    />
                    <button 
                        type="button" // Type button agar tidak submit form utama
                        onClick={handleApplyPromo}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 rounded-sm transition-colors border border-white/10"
                    >
                        APPLY
                    </button>
                </div>
                {/* Pesan Status Promo */}
                {promoMessage.text && (
                    <p className={`text-xs mt-2 font-medium ${promoMessage.type === 'success' ? 'text-purple-500' : 'text-red-500'}`}>
                        {promoMessage.text}
                    </p>
                )}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-300">Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              
              {/* Baris Diskon (Muncul jika ada diskon) */}
              {discount > 0 && (
                <div className="flex justify-between animate-pulse">
                    <span className="text-purple-500">Discount ({appliedCode})</span>
                    <span className="text-purple-500">- Rp {discount.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10 mt-2">
                <span className="text-white">Total</span>
                {/* Menggunakan finalTotal */}
                <span className="text-white">Rp {finalTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;