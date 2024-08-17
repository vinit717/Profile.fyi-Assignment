import { API_URL } from '@/constants/url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
    getCart: builder.query({
      query: () => 'cart',
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: 'cart/add',
        method: 'POST',
        body: product,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: 'cart/remove',
        method: 'POST',
        body: { productId },
      }),
    }),
    updateCartItemQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: 'cart/update-quantity',
        method: 'POST',
        body: { productId, quantity },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} = api;