export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface UserCheckoutDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}
