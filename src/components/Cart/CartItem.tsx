
import React from 'react';
import Image from "next/image";

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  

  interface CartItemProps {
    item: CartItem;
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
  };

  const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => (
    <div key={item.id} className="flex items-center border-b py-4">
      <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain mr-4" priority />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="bg-gray-200 px-2 py-1 rounded-l"
          >
            -
          </button>
          <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="bg-gray-200 px-2 py-1 rounded-r"
          >
            +
          </button>
          <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 ml-4 font-medium"
      >
        Remove
      </button>
        </div>
      </div>

    </div>
  );
  
export default CartItem;