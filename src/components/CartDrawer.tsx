import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-white">Shopping Cart</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p className="mb-4">Your cart is empty</p>
              <button 
                onClick={toggleCart}
                className="text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="w-20 h-24 object-cover rounded-sm bg-gray-900"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm text-white">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Size: {item.selectedSize}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                    <span className="font-medium text-white">Rp {item.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-white/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-bold text-lg text-white">Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-4 font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 rounded-sm"
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
