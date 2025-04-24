import baseApi from "../api/baseApi";

const qAndAAudioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create podcast
    createQAndAudio: builder.mutation({
      query: (data) => ({
        url: "/q-and-a-audios/create",
        body: data,
        method: "POST",
      }),
    }),

    // get all podcast
    getAllQAndAudio: builder.query({
      query: () => ({
        url: "/q-and-a-audios/getAll",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateQAndAudioMutation, useGetAllQAndAudioQuery } =
  qAndAAudioApi;
