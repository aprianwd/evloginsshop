import React from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
// HAPUS 'ChevronRight' DARI SINI
import { Package, ShoppingBag } from 'lucide-react'; 

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrder();

  // Filter order: Hanya tampilkan order milik user yang sedang login
  const myOrders = user 
    ? orders.filter(order => order.userId === user.email) 
    : [];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p>Please log in to view your orders.</p>
        <Link to="/login" className="text-primary mt-2">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">My Orders</h1>
        <p className="text-gray-400">Track and manage your recent purchases.</p>
      </div>

      {myOrders.length === 0 ? (
        // Tampilan jika belum ada order
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-10 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl text-white font-bold mb-2">No orders yet</h3>
          <p className="text-gray-400 mb-6">Looks like you haven't made any purchases yet.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        // List Order
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div key={order.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
              
              {/* Header Card Order */}
              <div className="bg-white/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                    <p className="text-white font-mono font-bold">{order.id}</p>
                  </div>
                </div>
                
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Date Placed</p>
                    <p className="text-gray-300 text-sm">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Total Amount</p>
                    <p className="text-primary font-bold">Rp {order.total.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>

              {/* Body Card (List Items) */}
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-white/5 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-4">
                        {/* Gambar Produk Kecil */}
                        <div className="h-16 w-16 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                          {item.image ? (
                             <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                             <div className="h-full w-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} x Rp {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Card Status */}
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
                    <span className="text-sm text-yellow-500 font-medium">{order.status}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;