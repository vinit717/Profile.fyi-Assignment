import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '@/components/Layout';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import CartItem from '@/components/Cart/CartItem';

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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className='lg:col-span-3 border rounded-lg p-4 shadow-md'>
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            <div className="lg:col-span-2 border rounded-lg p-4 shadow-md h-96">
              <h2 className="text-2xl font-semibold my-4 ">Cart Summary</h2>
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
              <div className="mb-4 flex flex-col	gap-4">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="border p-2 w-full"
                />
                <button
                  onClick={applyDiscount}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
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
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
