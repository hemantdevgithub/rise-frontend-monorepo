import { useGetSinglePollStatisticsQuery } from "@/redux/features/poll/pollApi";
import { TPollStatistics } from "@/types/poll.type";
import { Progress } from "@repo/ui";

const PollStatisticsContent = ({ pollId }: { pollId: string }) => {
  const { data, isLoading, isError } = useGetSinglePollStatisticsQuery(pollId, {
    skip: !pollId,
  });

  const statistics = data?.data as TPollStatistics;
  const { maybePercentage, yesPercentage, noPercentage } =
    calculateParticipationPercentages(statistics || {});

  if (isLoading) return <div>Loading...</div>;
  if (isError || !statistics) return <div>No poll data available.</div>;

  return (
    <div className="space-y-4 rounded-md border bg-background p-4 dark:bg-secondary">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-foreground">
        Poll Results
      </h2>
      <ProgressBar label="Yes" value={yesPercentage} color="bg-green-500" />
      <ProgressBar
        label="No"
        value={noPercentage}
        color="bg-red-500 bg-opacity-30"
      />
      <ProgressBar
        label="Maybe"
        value={maybePercentage}
        color="bg-yellow-500"
      />
    </div>
  );
};

// ProgressBar component for cleaner structure
const ProgressBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="space-y-1">
    <span className="text-sm font-medium text-gray-700 dark:text-foreground">
      {label}: {value.toFixed(2)}%
    </span>
    <Progress
      className={`h-5 ${color}`}
      value={value}
      aria-label={`${label} percentage`}
    />
  </div>
);

// Calculate participation percentages
type ParticipationPercentages = {
  yesPercentage: number;
  noPercentage: number;
  maybePercentage: number;
};

const calculateParticipationPercentages = (
  counts: Partial<TPollStatistics>
): ParticipationPercentages => {
  const {
    yesCount = 0,
    noCount = 0,
    maybeCount = 0,
    totalParticipants = 1,
  } = counts;

  return {
    yesPercentage: (yesCount / totalParticipants) * 100,
    noPercentage: (noCount / totalParticipants) * 100,
    maybePercentage: (maybeCount / totalParticipants) * 100,
  };
};
export default PollStatisticsContent;
