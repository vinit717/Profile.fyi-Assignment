import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import { RootState } from '@/store';
import CartItem from '@/components/Cart/CartItem';
import { useGetCartQuery, useUpdateCartItemQuantityMutation, useRemoveFromCartMutation, useApplyDiscountMutation } from '@/service/api';
import ErrorMessage from '@/components/ErrorMessage';

const Cart: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { data: cart, isLoading, error: cartError } = useGetCartQuery(undefined, { skip: !isAuthenticated });
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [removeFromCartMutation] = useRemoveFromCartMutation();
  const [applyDiscount] = useApplyDiscountMutation();

  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      const subtotal = cart.items.reduce((total: number, item: CartItem) => {
        return total + item.product.price * item.quantity;
      }, 0);
      setTotal(subtotal - discount);
    }
  }, [cart, discount]);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      try {
        await updateCartItemQuantity({ productId: id, quantity: newQuantity }).unwrap();
      } catch (err) {
        console.error('Failed to update quantity:', err);
      }
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await removeFromCartMutation(id).unwrap();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const applyDiscountCode = async () => {
    setDiscountError('');
    try {
      const result = await applyDiscount({ discountCode }).unwrap();
      setDiscount(result.discount);
      setTotal(result.total);
    } catch (err) {
      setDiscountError('Failed to apply discount code');
    }
  };

  if (isLoading) return <Layout title="Cart | E-commerce"><div>Loading cart...</div></Layout>;
  if (cartError) return <Layout title="Cart | E-commerce"><ErrorMessage message="Failed to load cart. Please try again later." /></Layout>;
  if (!cart || cart.items.length === 0) return <Layout title="Cart | E-commerce"><div>Your cart is empty.</div></Layout>;

  return (
    <Layout title="Cart | E-commerce">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className='lg:col-span-3 border rounded-lg p-4 shadow-md'>
            {cart.items.map((item: CartItem) => (
              <CartItem 
                key={item.product._id}
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
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${(total - discount).toFixed(2)}</span>
            </div>
            <div className="mb-4 flex flex-col gap-4">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="border p-2 w-full"
              />
              <button
                onClick={applyDiscountCode}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
              >
                Apply Discount
              </button>
              {discountError && <p className="text-red-500">{discountError}</p>}
            </div>
            {isAuthenticated ? (
              <>
                <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Proceed to Checkout</button>
              </>
            ) : (
              <p>Please log in to apply discounts and checkout</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
