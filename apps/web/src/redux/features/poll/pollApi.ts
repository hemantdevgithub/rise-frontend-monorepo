import baseApi from "../api/baseApi";

const pollApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: () => ({
        url: "/polls/get-all",
      }),
      providesTags: ["Polls"],
    }),
    createPoll: builder.mutation({
      query: (data) => ({
        url: "/polls/create-poll",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["Polls"],
    }),
    addAnswer: builder.mutation({
      query: (data) => ({
        url: "/poll-answers/add-poll-answer",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["Polls"],
    }),
    getUserAllPollAnswers: builder.query({
      query: () => ({
        url: "/poll-answers/user-all-poll-answers",
      }),
      providesTags: ["Polls"],
    }),
    getSinglePollStatistics: builder.query({
      query: (pollId) => ({
        url: `/poll-answers/statistics/${pollId}`,
      }),
      providesTags: ["Polls"],
    }),
  }),
});

export const {
  useCreatePollMutation,
  useGetPollsQuery,
  useAddAnswerMutation,
  useGetUserAllPollAnswersQuery,
  useGetSinglePollStatisticsQuery,
} = pollApi;
