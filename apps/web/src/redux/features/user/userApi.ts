import baseApi from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userOnboarding: builder.mutation({
      query: (data) => ({
        url: `/users/onboarding`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BasicProfile"],
    }),
  }),
});

export const { useUserOnboardingMutation } = userApi;
