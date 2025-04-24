import baseApi from "../api/baseApi";

const adminauthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (data) => ({
        url: "/admin/admin-login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = adminauthApi;
