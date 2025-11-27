// 1. Ganti baris import React. 
// Pisahkan 'ReactNode' menggunakan 'import type'
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // <--- PERBAIKAN DI SINI
import { useAuth } from './AuthContext';

// Tipe data untuk item dalam order
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Tipe data untuk satu pesanan
export interface Order {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: any[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders dari LocalStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem('evlogins_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Fungsi tambah order
  const addOrder = (items: any[], total: number) => {
    if (!user) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.email,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.images ? item.images[0] : ''
      })),
      total: total,
      status: 'Processing'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('evlogins_orders', JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within an OrderProvider');
  return context;
};