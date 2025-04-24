import baseApi from "../api/baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: (query) => ({ url: `/lessons?${query}` }),
      providesTags: ["Lessons"],
    }),

    getLessonsByRole: builder.query({
      query: () => ({ url: `/lessons/user/by-role` }),
      providesTags: ["Lessons"],
    }),

    getLessonsByType: builder.query({
      query: (type) => ({ url: `/lessons/by-type/${type}` }),
      providesTags: ["Lessons"],
    }),

    getLessonDetails: builder.query({
      query: (slug: string) => ({
        url: `/lessons/slug/${slug}`,
      }),
    }),

    getRecentLessons: builder.query({
      query: () => ({ url: "/lessons/recent" }),
    }),

    getTotalLessonCount: builder.query({
      query: () => ({ url: "/lessons/count" }),
    }),

    addLesson: builder.mutation({
      query: (data) => ({
        url: "/lessons/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lessons"],
    }),

    getAllLessonsWithChapters: builder.query({
      query: () => ({
        url: "/lessons/with-chapters",
      }),
    }),

    getLessonById: builder.query({
      query: (params) => ({
        url: `/lessons/id/${params}`,
        method: "GET",
        params: params,
      }),
      providesTags: ["LessonsQuizzes"],
    }),

    getAllLessonsQuizzes: builder.query({
      query: (params) => ({
        url: "/lessons/quizzes",
        method: "GET",
        params: params,
      }),
      providesTags: ["LessonsQuizzes"],
    }),

    getLessonWithoutExam: builder.query({
      query: () => ({
        url: "/lessons/without-exam",
        method: "GET",
      }),
      providesTags: ["Exam", "Lessons", "Lesson"],
    }),

    getAllLessonSegments: builder.query({
      query: () => ({
        url: `/lesson-segments`,
        method: "GET",
      }),
      providesTags: ["LessonsSegment"],
    }),

    createLessonSegment: builder.mutation({
      query: (data) => ({
        url: `/lesson-segments/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LessonsSegment"],
    }),

    getAllLessonsBySegment: builder.query({
      query: () => ({
        url: `/lessons/segments`,
      }),
      providesTags: ["LessonsSegment"],
    }),

    getAllInstructorLessons: builder.query({
      query: () => ({
        url: `/lessons/author`,
      }),
      providesTags: ["Lesson"],
    }),

    changeLessonStatus: builder.mutation({
      query: ({ lessonId, status }) => ({
        url: `/lessons/${lessonId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Lesson"],
    }),
    getAllLessonsForEditor: builder.query({
      query: () => ({
        url: `/lessons/editor/`,
      }),
      providesTags: ["Lesson"],
    }),
    getAllPendingLessons: builder.query({
      query: () => ({
        url: `/lessons/pending/`,
      }),
      providesTags: ["Lesson"],
    }),
    getAllEnrolledLessons: builder.query({
      query: () => ({
        url: `/lessons/enrolled/`,
      }),
      providesTags: ["Lesson", "Enrollment"],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonDetailsQuery,
  useGetRecentLessonsQuery,
  useGetTotalLessonCountQuery,
  useAddLessonMutation,
  useGetAllLessonsQuizzesQuery,
  useGetAllLessonsWithChaptersQuery,
  useGetLessonByIdQuery,
  useGetLessonsByRoleQuery,
  useGetAllLessonSegmentsQuery,
  useGetLessonsByTypeQuery,
  useGetLessonWithoutExamQuery,
  useCreateLessonSegmentMutation,
  useGetAllLessonsBySegmentQuery,
  useGetAllInstructorLessonsQuery,
  useChangeLessonStatusMutation,
  useGetAllLessonsForEditorQuery,
  useGetAllPendingLessonsQuery,
  useGetAllEnrolledLessonsQuery,
} = lessonApi;
