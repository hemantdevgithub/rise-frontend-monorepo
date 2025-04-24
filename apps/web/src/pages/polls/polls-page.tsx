import PollCard from "@/components/Polls/poll-card";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import {
  useGetPollsQuery,
  useGetUserAllPollAnswersQuery,
} from "@/redux/features/poll/pollApi";
import { TPoll, TPollAnswer } from "@/types/poll.type";
import { Empty } from "@repo/ui";

const PollsPage = () => {
  const { data: polls, isError, isLoading } = useGetPollsQuery(undefined);
  const { data: pollAnswerData, isLoading: isUserPollDataLoading } =
    useGetUserAllPollAnswersQuery(undefined);
  return (
    <div className="w-full space-y-5">
      {polls?.data?.length === 0 && <Empty />}
      {isError ? (
        <div className="m-5 flex h-[400px] items-center justify-center rounded-md bg-gray-200 font-roboto text-2xl font-semibold">
          Something Went Wrong Please Come Back Later
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {isLoading || isUserPollDataLoading ? (
            <SkeletonCard />
          ) : (
            <>
              {polls?.data?.map((poll: TPoll) => (
                <div key={poll.id}>
                  <PollCard
                    key={poll.id}
                    item={poll}
                    isAnswered={pollAnswerData?.data.some(
                      (x: TPollAnswer) => x.pollId === poll.id
                    )}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PollsPage;
