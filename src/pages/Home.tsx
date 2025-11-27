import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            /* Ganti URL di bawah ini dengan URL Cloudinary asli Anda */
            src="https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022414/BANNER3_we7g9d.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>


      {/* Featured Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-2 text-white uppercase tracking-tight">Our TopProducts</h2>
            <p className="text-gray-400 font-medium">Limited quantities. No restocks.</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 aspect-[3/3] bg-gray-1000">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  New
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Shop Now</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-gray-400 font-bold mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider border-b-2 border-white pb-1 text-white">
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-surface py-24 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022409/banner3raw_qjjpq2.png" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white uppercase tracking-tighter">It All Started From Culture</h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-lg">
            Born in the underground, raised in the concrete jungle. We create gear for those who move fast and break barriers.
          </p>
          <Link to="/about" className="inline-block border-2 border-white px-8 py-3 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            About Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;