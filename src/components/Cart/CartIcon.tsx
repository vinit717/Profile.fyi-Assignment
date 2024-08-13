import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Image from 'next/image';

const CartIcon: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative cursor-pointer">
      <Image
        src="/cart.svg"
        alt="Cart"
        width={32}  
        height={32}
        className="h-8 w-8 text-gray-700"
      />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
