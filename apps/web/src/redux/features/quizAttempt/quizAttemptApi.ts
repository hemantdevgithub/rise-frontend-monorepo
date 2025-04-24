import baseApi from "../api/baseApi";

const quizAttemptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitQuizAttempt: builder.mutation({
      query: (data) => ({
        url: `/quiz-attempts/attempt-quiz`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubmitQuizAttemptMutation } = quizAttemptApi;
