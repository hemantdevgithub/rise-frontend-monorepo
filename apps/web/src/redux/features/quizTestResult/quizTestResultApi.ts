import baseApi from "../api/baseApi";

const quizTestResultApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create result
    createQuizTestResult: builder.mutation({
      query: (data) => ({
        url: "/quiz-test-result/create",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateQuizTestResultMutation } = quizTestResultApi;
