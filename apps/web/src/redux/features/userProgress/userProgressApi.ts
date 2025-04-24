import baseApi from "../api/baseApi";

const userProgressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProgress: builder.mutation({
      query: (data) => ({
        url: "/user-progress/update-progress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserProgress", "Lessons"],
    }),
    getProgressByChapterId: builder.query({
      query: (chapterId) => {
        return {
          url: `/user-progress/progress/${chapterId}`,
        };
      },
      providesTags: ["UserProgress", "Lessons"],
    }),
    getUserSingleLessonProgress: builder.query({
      query: (lessonId) => ({
        url: `/lessons/user/progress/${lessonId}`,
      }),
      providesTags: ["Lessons"],
    }),
  }),
});

export const {
  useUpdateProgressMutation,
  useGetProgressByChapterIdQuery,
  useGetUserSingleLessonProgressQuery,
} = userProgressApi;
