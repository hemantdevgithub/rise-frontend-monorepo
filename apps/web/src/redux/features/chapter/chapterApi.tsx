import baseApi from "../api/baseApi";

const chapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChapter: builder.mutation({
      query: (data) => ({
        url: "/chapters/create",
        method: "POST",
        body: data,
      }),
    }),
    getChaptersForALesson: builder.query({
      query: (slug) => ({
        url: `/chapters/get-lessons-chapters/${slug}`,
      }),
    }),
    getChapterDetailBySlug: builder.query({
      query: (slug) => ({
        url: `/chapters/details/${slug}`,
      }),
    }),
    getChaptersByLessonId: builder.query({
      query: (lessonId) => ({
        url: `/chapters/get-chapters-by-lesson-id/${lessonId}`,
      }),
    }),
    getRelatedChapters: builder.query({
      query: (currentChapterId) => ({
        url: `/chapters/related-chapters/${currentChapterId}`,
      }),
    }),
  }),
});

export const {
  useCreateChapterMutation,
  useGetChaptersForALessonQuery,
  useGetChapterDetailBySlugQuery,
  useGetChaptersByLessonIdQuery,
  useGetRelatedChaptersQuery,
} = chapterApi;
