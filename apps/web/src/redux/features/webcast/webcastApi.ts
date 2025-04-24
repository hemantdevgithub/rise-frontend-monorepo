import baseApi from "../api/baseApi";

const webcastApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWebcast: builder.mutation({
      query: (data) => ({
        url: "/webcasts/create-webcast",
        body: data,
        method: "POST",
      }),
    }),
    getAllWebcasts: builder.query({
      query: () => ({
        url: "/webcasts/get-all",
      }),
    }),
    getAWebcast: builder.query({
      query: (slug: string) => ({
        url: `/webcasts/webcast/${slug}`,
      }),
    }),
  }),
});

export const {
  useCreateWebcastMutation,
  useGetAWebcastQuery,
  useGetAllWebcastsQuery,
} = webcastApi;
