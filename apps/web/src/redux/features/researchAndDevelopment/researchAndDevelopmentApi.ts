import baseApi from "../api/baseApi";

const researchAndDevelopmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResearchAndDevelopments: builder.query({
      query: (query) => ({
        url: `/research/all-research-and-developments?${query}`,
      }),
      providesTags: ["ResearchAndDevelopments"],
    }),
    getResearchAndDevelopmentDetails: builder.query({
      query: (id: string) => {
        return {
          url: `/research/research-and-development/${id}`,
        };
      },
    }),
    getRecentResearchAndDevelopments: builder.query({
      query: (currentId: string) => ({
        url: `/research/recent-research-and-developments/${currentId}`,
      }),
    }),
    getTotalResearchAndDevelopmentCount: builder.query({
      query: () => ({
        url: "/research/research-and-developments-count",
      }),
    }),
    addResearchAndDevelopment: builder.mutation({
      query: (data) => ({
        url: "/research/create-research-and-development",
        method: "POST",
        body: data,
        headers: {
          // "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["ResearchAndDevelopments"],
    }),
  }),
});

export const {
  useAddResearchAndDevelopmentMutation,
  useGetRecentResearchAndDevelopmentsQuery,
  useGetResearchAndDevelopmentDetailsQuery,
  useGetResearchAndDevelopmentsQuery,
  useGetTotalResearchAndDevelopmentCountQuery,
} = researchAndDevelopmentApi;
