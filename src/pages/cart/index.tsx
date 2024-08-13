// pages/cart.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const applyDiscount = () => {
    if (discountCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1);
    } else if (discountCode === 'DISCOUNT20') {
      setDiscount(20);
    } else {
      alert('Invalid discount code');
    }
  };

  return (
    <Layout title="Cart | E-commerce">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain mr-4" priority />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <span>${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="border p-2 mr-2"
                />
                <button
                  onClick={applyDiscount}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Apply Discount
                </button>
              </div>
              <button
                onClick={() => alert('Checkout functionality not implemented')}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;