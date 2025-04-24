import baseApi from "../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (data) => ({
        url: "/comments/add-comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    getCommentByContentId: builder.query({
      query: (id: string) => ({
        url: `/comments/comment/${id}`,
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const { useAddCommentMutation, useGetCommentByContentIdQuery } =
  commentApi;
