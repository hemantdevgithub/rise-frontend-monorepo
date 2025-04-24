import baseApi from "../api/baseApi";

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (phoneNumber: string) => ({
        url: `/phonenumber-verification/send-otp`,
        method: "POST",
        body: { phoneNumber },
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["OTP"],
    }),
    verifyOtp: builder.mutation({
      query: ({ phoneNumber, otp }: { phoneNumber: string; otp: string }) => ({
        url: `/phonenumber-verification/verify-otp`,
        method: "POST",
        body: { phoneNumber, otp },
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["OTP"],
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApi;
export default otpApi;
