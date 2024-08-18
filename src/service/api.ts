import { API_URL } from '@/constants/url';
import { RootState } from '@/store';
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
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }, }),
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

    applyDiscount: builder.mutation<{ discount: number; total: number }, { discountCode: string }>({
      query: (data) => ({
        url: 'cart/apply-discount',
        method: 'POST',
        body: data,
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
  useApplyDiscountMutation
} = api;