import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetProductsQuery } from '@/service/api';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { RootState } from '@/store';
import LoginModal from '@/components/Auth/LoginModal';

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!router.isReady || !id) return; 
  }, [router.isReady, id]);

  if (!router.isReady) return <Layout title="Loading..."><div>Loading...</div></Layout>;
  if (isLoading) return <Layout title="Loading..."><div>Loading...</div></Layout>;
  if (error) return <Layout title="Error"><div>Error loading product</div></Layout>;

  const product = products?.find(p => p._id === id);

  if (!product) return <Layout title="Not Found"><div>Product not found</div></Layout>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      router.push('/checkout');
    }
  };

  const rating = (Math.random() * 2 + 3).toFixed(1);
  const reviews = Math.floor(Math.random() * 500) + 50;
  const stock = Math.floor(Math.random() * 100) + 1;
  const deliveryDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <Layout title={product.title}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-md relative">
              <Image
                src={product.image}
                alt={product.title}
                layout="responsive"
                width={500}
                height={500}
                objectFit="contain"
                className="rounded-lg"
                priority={false}
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="font-semibold">Category:</span> {product.category}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Rating:</span> {rating} ⭐ ({reviews} reviews)
            </div>
            <div className="mb-4">
              <span className="font-semibold">In Stock:</span> {stock} units
            </div>
            <div className="mb-4">
              <span className="font-semibold">Estimated Delivery:</span> {deliveryDate}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </Layout>
  );
};

export default ProductPage;
