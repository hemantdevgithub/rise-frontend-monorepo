import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    resentVerificationEmail: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/resent-verification-link",
        method: "POST",
        body: { email },
      }),
    }),

    // verify account
    verifyAccount: builder.mutation({
      query: (token) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: { token },
      }),
    }),

    // login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // forget password
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    //  password
    resetPassword: builder.mutation({
      query: ({
        id,
        newPassword,
        token,
      }: {
        token: string;
        id: string;
        newPassword: string;
      }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { id, newPassword },
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useResentVerificationEmailMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyAccountMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
