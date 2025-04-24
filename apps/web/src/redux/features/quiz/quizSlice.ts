import { RootState } from "@/redux/store";
import { TQuizQuestion } from "@/types/quiz.type";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  quizNumber: number;
  questions: TQuizQuestion[];
  isCompleted: boolean;
  isStarted: boolean;
  selectedAnswers: {
    questionId: string;
    answer: string;
    question: string;
  }[];
};

const initialState: TInitialState = {
  quizNumber: 0,
  questions: [],
  isCompleted: false,
  isStarted: false,
  selectedAnswers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.isStarted = true;
      state.quizNumber = 1;
      state.questions = action.payload;
    },
    goNextQuiz: (state, action) => {
      state.selectedAnswers = action?.payload;
      if (state.quizNumber < state?.questions?.length) {
        state.quizNumber = state.quizNumber + 1;
      } else {
        state.isCompleted = true;
        state.isStarted = false;
      }
    },
    closeQuiz: (state) => {
      state.quizNumber = 0;
      state.questions = [];
      state.selectedAnswers = [];
      state.isCompleted = false;
      state.isStarted = false;
    },
  },
});

export const quizReducer = quizSlice.reducer;
export const { startQuiz, goNextQuiz, closeQuiz } = quizSlice.actions;

export const selectQuizQuestions = (state: RootState) => state.quiz.questions;
export const selectAnsweredQuestions = (state: RootState) =>
  state.quiz.selectedAnswers;
export const selectQuizNumber = (state: RootState) => state.quiz.quizNumber;
export const selectIsCompleted = (state: RootState) => state.quiz.isCompleted;
export const selectIsStarted = (state: RootState) => state.quiz.isStarted;
