import baseApi from "../api/baseApi";

const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create quiz
    createExam: builder.mutation({
      query: (data) => ({
        url: "/exams/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Exam", "Quizzes", "LessonsQuizzes"],
    }),
    getAllExams: builder.query({
      query: () => ({
        url: "/exams/",
        method: "GET",
      }),
      providesTags: ["Exam"],
    }),
    getSingleExamWithQuestion: builder.query({
      query: (examId) => ({
        url: `/exams/get-exam-with-question/${examId}`,
      }),
      providesTags: ["Exam"],
    }),
  }),
});

export const {
  useCreateExamMutation,
  useGetAllExamsQuery,
  useGetSingleExamWithQuestionQuery,
} = examApi;
