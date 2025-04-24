import baseApi from "../api/baseApi";

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (query) => ({ url: `/articles/all-articles?${query}` }),
      providesTags: ["Articles"],
    }),
    getArticleDetails: builder.query({
      query: (id: string) => ({ url: `/articles/article/${id}` }),
      providesTags: ["Articles"],
    }),
    getRecentArticles: builder.query({
      query: () => ({ url: "/articles/recent-articles" }),
      providesTags: ["Articles"],
    }),
    getTotalArticleCount: builder.query({
      query: () => ({ url: "/articles/article-count" }),
      providesTags: ["Articles"],
    }),
    createArticle: builder.mutation({
      query: (data) => ({
        url: "/articles/create-article",
        method: "POST",
        body: data,
        headers: {
          // "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetArticleDetailsQuery,
  useGetRecentArticlesQuery,
  useGetTotalArticleCountQuery,
  useGetArticlesQuery,
  useCreateArticleMutation,
} = articleApi;
