export interface Restaurant {
  id: number;
  name: string;
  link: string;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  price: string;
  imageSrc: string;
  imageAlt: string;
  menuItems: FoodItem[];
}

export interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  restaurantId: number;
  description: string;
}

export interface FoodCardProps {
  menuItems: FoodItem[];
}

export interface CartItem {
  product: FoodItem;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}
