export type TPoll = {
  id: string;
  question: string;
};

export type TPollStatistics = {
  yesCount: number;
  noCount: number;
  maybeCount: number;
  totalParticipants: number;
};

export type TPollAnswerResponse = {
  chosenAnswer: string;
  statistics: TPollStatistics;
};
export type TPollAnswer = {
  id: string;
  pollId: string;
  choice: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
