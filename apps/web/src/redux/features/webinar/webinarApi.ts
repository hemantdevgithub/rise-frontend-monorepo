import baseApi from "../api/baseApi";

const webinarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWebinar: builder.mutation({
      query: (data) => ({
        url: "/webinars/create-webinar",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Webinars"],
    }),
    getAllWebinars: builder.query({
      query: () => ({
        url: "/webinars/get-all",
      }),
      providesTags: ["Webinars"],
    }),
    getSingleWebinarBySlug: builder.query({
      query: (id) => {
        return {
          url: `/webinars/webinar/${id}`,
          method: "GET",
        };
      },
    }),
    registerInWebinar: builder.mutation({
      query: (data: any) => ({
        url: `/registered-webinars/register`,
        method: "POST",
        body: data,
      }),
    }),
    checkUserWebinarRegistration: builder.query({
      query: (webinarId) => ({
        url: `/registered-webinars/check/${webinarId}`,
      }),
    }),
  }),
});

export const {
  useGetAllWebinarsQuery,
  useCreateWebinarMutation,
  useRegisterInWebinarMutation,
  useGetSingleWebinarBySlugQuery,
  useCheckUserWebinarRegistrationQuery,
} = webinarApi;
