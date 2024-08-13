import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Product } from '@/service/api';
import { addToCart } from '@/store/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
      <p className="text-gray-600 mb-4 truncate">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        <button 
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;