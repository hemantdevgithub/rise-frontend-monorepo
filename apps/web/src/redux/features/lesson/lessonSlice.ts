import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  createdLessonId: string;
  isLessonSidebarOpen: boolean;
  isLessonLayout: boolean;
};

const initialState: TInitialState = {
  createdLessonId: "",
  isLessonLayout: false,
  isLessonSidebarOpen: false,
};
const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    // add created lesson id
    addCreatedLessonId: (state, action) => {
      state.createdLessonId = action.payload;
    },
    setIsLessonSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isLessonSidebarOpen = action.payload;
    },
    setIsLessonLayout: (state, action: PayloadAction<boolean>) => {
      state.isLessonLayout = action.payload;
    },
  },
});
export const lessonReducer = lessonSlice.reducer;
export const { addCreatedLessonId, setIsLessonLayout, setIsLessonSidebarOpen } =
  lessonSlice.actions;

//selector
export const selectCreatedLessonId = (state: RootState) =>
  state.lesson.createdLessonId;
export const selectLessonState = (state: RootState) => state.lesson;
