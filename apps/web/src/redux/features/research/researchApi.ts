import baseApi from "../api/baseApi";

const researchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllResearch: builder.query({
      query: () => ({
        url: `/research/`,
      }),
      providesTags: ["Research"],
    }),
    getResearchById: builder.query({
      query: (id) => ({
        url: `/research/id/${id}`,
      }),
      providesTags: ["Research"],
    }),
    getResearchBySlug: builder.query({
      query: (slug) => ({
        url: `/research/slug/${slug}`,
      }),
      providesTags: ["Research"],
    }),
  }),
});

export const {
  useGetAllResearchQuery,
  useGetResearchByIdQuery,
  useGetResearchBySlugQuery,
} = researchApi;
