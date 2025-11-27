import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
// --- BARU: Import icon panah ---
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'; 

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // --- BARU: Logic untuk tombol Next/Prev ---
  const handlePrevImage = () => {
    if (!product) return;
    const currentIndex = product.images.indexOf(selectedImage);
    const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
    setSelectedImage(product.images[prevIndex]);
  };

  const handleNextImage = () => {
    if (!product) return;
    const currentIndex = product.images.indexOf(selectedImage);
    const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(product.images[nextIndex]);
  };
  // ------------------------------------------

  if (!product) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="underline text-primary">Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setIsAdding(true);
    addToCart(product, selectedSize);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-20 h-24 border ${
                  selectedImage === img ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover bg-gray-900" />
              </button>
            ))}
          </div>
          
          {/* --- Main Image (Diedit) --- */}
          {/* Tambahkan class 'relative' dan 'group' pada container ini */}
          <div className="flex-1 aspect-[3/4] bg-gray-900 relative group">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            
            {/* Tombol Kiri */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Tombol Kanan */}
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          {/* --------------------------- */}

        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Bagian Info tidak berubah, tetap sama seperti kode asli Anda */}
          <span className="text-primary text-sm uppercase tracking-wider mb-2 font-medium">{product.category}</span>
          <h1 className="font-serif text-4xl font-bold mb-4 text-white">{product.name}</h1>
          <p className="text-2xl font-medium mb-8 text-white">Rp {product.price.toLocaleString('id-ID')}</p>

          <div className="prose text-gray-400 mb-8 text-sm leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-white">Select Size</span>
              <button className="text-xs text-gray-500 underline hover:text-primary">Size Guide</button>
            </div>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border text-sm transition-all rounded-sm ${
                    selectedSize === size 
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'border-white/20 text-gray-400 hover:border-purple-500 hover:text-white bg-surface'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-4 font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 rounded-sm ${
              isAdding 
                ? 'bg-green-600 text-white' 
                : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20'
            }`}
          >
            {isAdding ? (
              <>
                <Check size={20} /> ADDED TO CART
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>

          <div className="mt-8 border-t border-white/10 pt-6 space-y-4 text-sm text-gray-500">
            <div className="flex gap-4">
              <span>Free shipping on orders over Rp 1.000.000</span>
            </div>
            <div className="flex gap-4">
              <span>14-day easy returns</span>
            </div>
            <div className="flex gap-4">
              <span>Secure checkout powered by Xendit / Midtrans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;