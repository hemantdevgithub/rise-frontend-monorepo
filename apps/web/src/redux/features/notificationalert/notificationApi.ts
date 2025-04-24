import baseApi from "../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notifications/get-all",
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
