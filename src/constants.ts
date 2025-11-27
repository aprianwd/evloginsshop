import { type Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mushroom T-Shirt Black',
    price: 220000,
    description: 'Made with a heavyweight 280gsm body, this double-layer top brings a clean contrast between the black tee and the white inner sleeves. The puff print hits on both the front and back give it a raised, standout look that pops without being too loud. A reliable street-ready piece that’s easy to throw on and instantly adds character to your fit.',
    category: 'Tops',
    images: [
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022406/FRONTTEE1_qm2pti.png',
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022405/BACKTEE_haygq4.png',
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022416/SCTEE_su1s31.png',
    ],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Baggy Barrel Jeans',
    price: 390000,
    description: 'Made from durable black raw denim, these pants offer a baggy barrel fit that delivers both comfort and style. Front and back embroidery add a striking visual element, making them a versatile staple for any wardrobe.',
    category: 'Bottoms',
    images: [
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022407/PANTSFRONT_ggcqxl.png',
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022411/PANTSBACK_pitqr3.png',
    ],
    sizes: ['28', '30', '32', '34'],
  },
  {
    id: '3',
    name: 'Logo Box Double Layer Tee',
    price: 260000,
    description: 'This double-layer shirt brings a clean street vibe with its black tee and white sleeve contrast. The front graphic hits just right—bold enough to stand out, but still easy to pair with any bottoms. A solid piece for everyday fits when you want something simple but still has attitude.',
    category: 'Tops',
    images: [
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022406/FRONTLS_kyspw1.png',
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022405/BACKLS_eztgwc.png',
      'https://res.cloudinary.com/dvvr41ybq/image/upload/v1764022415/SCLS_tpv5wx.png',
    ],
    sizes: ['M', 'L', 'XL'],
  },
];