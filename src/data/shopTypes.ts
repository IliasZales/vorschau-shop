export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  features: string[];
  specs: { label: string; value: string }[];
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
}

export interface ShopConfig {
  password: string;
  testAccount: {
    email: string;
    password: string;
  };
  currency: string;
}
