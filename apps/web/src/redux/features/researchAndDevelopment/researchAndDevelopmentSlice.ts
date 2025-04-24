import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  createdResearchAndDevelopmentId: string;
  isSidebarOpen: boolean;
  isResearchAndDevelopmentPath: boolean;
};

const initialState: TInitialState = {
  createdResearchAndDevelopmentId: "",
  isSidebarOpen: false,
  isResearchAndDevelopmentPath: false,
};
const researchAndDevelopmentSlice = createSlice({
  name: "researchAndDevelopment",
  initialState,
  reducers: {
    // add created lesson id
    addCreatedResearchAndDevelopmentId: (state, action) => {
      state.createdResearchAndDevelopmentId = action.payload;
    },

    setIsResearchAndDevelopmentSidebarOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isSidebarOpen = action.payload;
    },
    setIsResearchAndDevelopmentPath: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isResearchAndDevelopmentPath = action.payload;
    },
  },
});
export const researchAndDevelopmentReducer =
  researchAndDevelopmentSlice.reducer;
export const {
  addCreatedResearchAndDevelopmentId,
  setIsResearchAndDevelopmentPath,
  setIsResearchAndDevelopmentSidebarOpen,
} = researchAndDevelopmentSlice.actions;

//selector
export const selectCreatedResearchAndDevelopmentId = (state: RootState) =>
  state.researchAndDevelopment.createdResearchAndDevelopmentId;
export const selectResearchAndDevelopmentState = (state: RootState) =>
  state.researchAndDevelopment;
