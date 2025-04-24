import baseApi from "../api/baseApi";

const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestUserCertificate: builder.mutation({
      query: (data) => ({
        url: `/certificates/create-certificate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lessons"],
    }),
    getUserLessonCertificate: builder.query({
      query: (lessonId) => ({
        url: `/certificates/get-lesson-certificate/${lessonId}`,
      }),
      providesTags: ["Lessons"],
    }),
    getUserCertificateById: builder.query({
      query: (id) => ({
        url: `/certificates/get/${id}`,
      }),
      providesTags: ["Lessons"],
    }),
  }),
});

export const {
  useRequestUserCertificateMutation,
  useGetUserLessonCertificateQuery,
  useGetUserCertificateByIdQuery,
} = certificateApi;
