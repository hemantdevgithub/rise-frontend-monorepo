import baseApi from "../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create quiz
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quiz/create-quiz",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz", "Quizzes", "LessonsQuizzes"],
    }),
    addQuestionToQuiz: builder.mutation({
      query: (data) => ({
        url: "/questions/add-question",
        method: "POST",
        body: data,
      }),
    }),
    getAllQuiz: builder.query({
      query: () => ({
        url: "/quiz/get-all",
      }),
    }),
    getSingleQuizWithQuestion: builder.query({
      query: (quizId) => ({
        url: `/quiz/get-quiz-with-question/${quizId}`,
      }),
    }),
    getQuizzesByChapterId: builder.query({
      query: (chapterId) => ({
        url: `/quiz/get-chapter-quizzes/${chapterId}`,
      }),
    }),
    getQuizQuestions: builder.query({
      query: (quizId) => ({
        url: `/quiz/get-quiz-questions/${quizId}`,
      }),
    }),
  }),
});

export const {
  useAddQuestionToQuizMutation,
  useCreateQuizMutation,
  useGetAllQuizQuery,
  useGetSingleQuizWithQuestionQuery,
  useGetQuizzesByChapterIdQuery,
  useGetQuizQuestionsQuery,
} = quizApi;
