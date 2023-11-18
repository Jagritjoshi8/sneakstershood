import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/sneakers" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "getAllProducts",
      transformResponse: (response) =>
        response.allProducts
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
