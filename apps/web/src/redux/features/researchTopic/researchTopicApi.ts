import baseApi from "../api/baseApi";

const researchTopicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadResearchTopic: builder.mutation({
      query: (data) => ({
        url: `/research-topics`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ResearchTopic"],
    }),
    getAllResearchTopics: builder.query({
      query: () => ({
        url: `/research-topics/`,
      }),
      providesTags: ["ResearchTopic"],
    }),
    getResearchTopicDetails: builder.query({
      query: (id) => ({
        url: `/research-topics/get/${id}`,
      }),
      providesTags: ["ResearchTopic"],
    }),
    submitResearch: builder.mutation({
      query: (data) => ({
        url: `/research-topics/submit/`,
        method: "POST",
        body: data,
      }),
    }),
    getAllTopicSubmissions: builder.query({
      query: (id) => ({
        url: `/research-topics/submissions/${id}`,
        method: "GET",
      }),
    }),
    approveResearchSubmission: builder.mutation({
      query: (id) => ({
        url: `/research-topics/approve/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetResearchTopicDetailsQuery,
  useUploadResearchTopicMutation,
  useGetAllResearchTopicsQuery,
  useSubmitResearchMutation,
  useGetAllTopicSubmissionsQuery,
  useApproveResearchSubmissionMutation,
} = researchTopicApi;
