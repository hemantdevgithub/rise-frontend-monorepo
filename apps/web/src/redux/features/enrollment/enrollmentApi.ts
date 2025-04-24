import baseApi from "../api/baseApi";

const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: (data) => ({
        url: `/enrollments/enroll`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Enrollment"],
    }),

    getAllLearnerEnrollments: builder.query({
      query: () => ({
        url: `/enrollments/learner`,
      }),
      providesTags: ["Enrollment"],
    }),
  }),
});

export const { useEnrollInCourseMutation, useGetAllLearnerEnrollmentsQuery } =
  enrollmentApi;
