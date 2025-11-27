import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // 1. Tambah useSearchParams
import { PRODUCTS } from '../constants';
import { X } from 'lucide-react'; // Icon untuk tombol clear search

const Shop: React.FC = () => {
  // --- LOGIKA SEARCH & FILTER ---
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || ''; // Ambil text search dari URL
  
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  // Logika Filter Gabungan (Search + Category)
  const filteredProducts = PRODUCTS.filter(product => {
    // 1. Cek apakah sesuai kategori
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    
    // 2. Cek apakah sesuai kata kunci search (jika ada)
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;

    return matchesCategory && matchesSearch;
  });

  // Fungsi untuk menghapus pencarian
  const clearSearch = () => {
    setSearchParams({}); // Hapus query param dari URL
  };

  // Opsional: Jika user melakukan search baru, reset kategori ke 'All' 
  // supaya hasil pencarian lebih luas (hapus useEffect ini jika tidak ingin reset otomatis)
  useEffect(() => {
    if (searchQuery) {
      setFilterCategory('All');
    }
  }, [searchQuery]);

  return (
    <div className="pt-8 pb-20 container mx-auto px-4 animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">The Collection</h1>
        <p className="text-gray-400 max-w-md mx-auto">Explore our latest arrivals, designed for the contemporary lifestyle.</p>
      </div>

      {/* TAMPILAN STATUS PENCARIAN (Hanya muncul jika sedang mencari) */}
      {searchQuery && (
        <div className="flex justify-center items-center gap-3 mb-8 animate-fade-in">
          <p className="text-gray-300">
            Showing results for: <span className="text-primary font-bold">"{searchQuery}"</span>
          </p>
          <button 
            onClick={clearSearch}
            className="flex items-center gap-1 text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-full hover:bg-red-500/20 transition-colors"
          >
            Clear <X size={14} />
          </button>
        </div>
      )}

      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filterCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-surface text-gray-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group block">
              <div className="relative aspect-[3/3] overflow-hidden bg-gray-900 mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Optional secondary image on hover */}
                {product.images[1] && (
                  <img 
                    src={product.images[1]} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg leading-tight text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{product.category}</p>
                </div>
                <p className="font-medium text-sm text-white">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // UI JIKA PRODUK TIDAK DITEMUKAN
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 mb-4">No products found matching "{searchQuery}"</p>
          <button 
            onClick={clearSearch}
            className="text-primary hover:underline underline-offset-4"
          >
            View all products
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;