import baseApi from "../api/baseApi";

const podcastApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create podcast
    createPodcast: builder.mutation({
      query: (data) => ({
        url: "/podcasts/create",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Podcasts"],
    }),

    // get all podcast
    getAllPodcast: builder.query({
      query: () => ({
        url: "/podcasts/getAll",
        method: "GET",
      }),
      providesTags: ["Podcasts"],
    }),
  }),
});

export const { useCreatePodcastMutation, useGetAllPodcastQuery } = podcastApi;
