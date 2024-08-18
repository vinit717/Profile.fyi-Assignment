import React from 'react';
import Image from "next/image";
import { Product } from '@/service/api';

interface CartItem {
  product: Product;
  quantity: number;
}
  
interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => (
  <div key={item.product._id} className="flex items-center border-b py-4">
    <Image src={item.product.image} alt={item.product.title} width={80} height={80} className="object-contain mr-4" priority />
    <div className="flex-grow">
      <h2 className="text-lg font-semibold">{item.product.title}</h2>
      <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => onQuantityChange(item.product._id, item.quantity - 1)}
          className="bg-gray-200 px-2 py-1 rounded-l"
        >
          -
        </button>
        <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.product._id, item.quantity + 1)}
          className="bg-gray-200 px-2 py-1 rounded-r"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.product._id)}
          className="text-red-500 ml-4 font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;
