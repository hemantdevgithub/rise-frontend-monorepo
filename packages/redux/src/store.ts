import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { baseApi } from "./apis/baseApi";

// base redux store in apps we can extends this
export const createAppStore = (extraReducers: ReducersMapObject = {}) => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      ...extraReducers,
    },
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof createAppStore>["getState"];
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createAppStore>["dispatch"];
