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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = api;
