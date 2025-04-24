import { pollOptions } from "@/constants/pollOption";
import { useAddAnswerMutation } from "@/redux/features/poll/pollApi";
import { TPoll, TPollAnswerResponse } from "@/types/poll.type";
import { Button } from "@repo/ui";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const PollModalContent = ({ poll }: { poll: TPoll }) => {
  const [addPollAnswer] = useAddAnswerMutation();
  const [result, setResult] = useState({} as TPollAnswerResponse);
  const [loading, setLoading] = useState(false);

  const handleSubmitPoll = async (option: string) => {
    setLoading(true);
    try {
      // Simulate API request delay
      const response: any = await addPollAnswer({
        choice: option.toLowerCase(),
        pollId: poll.id,
      });
      if (response?.data?.success) {
        setResult(response.data.data);
        setLoading(false);
      }
      // Simulated API response data
    } catch (error) {
      console.error("Error submitting poll", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 px-5 pb-5 font-poppins">
      <img src="/Icons/yes.png" className="w-[80px]" alt="" />
      <h1 className="text-center font-roboto text-text dark:text-foreground">
        {poll.question}
      </h1>
      {loading ? (
        <div>
          <BeatLoader loading={loading} className="text-tommyBlue" />
        </div>
      ) : Object.keys(result).length === 0 ? (
        <div className="flex gap-5">
          {pollOptions.map((option) => (
            <Button
              onClick={() => handleSubmitPoll(option.label)}
              className="w-24"
              key={option.id}
            >
              {option.label}
            </Button>
          ))}
        </div>
      ) : (
        <div className="w-full space-y-3">
          <h2>
            You have chosen :{" "}
            <span className="font-semibold capitalize">
              "{result.chosenAnswer}"
            </span>
          </h2>
          <div className="flex">
            <table className="w-full">
              <tr>
                <td>Total Participant</td>
                <td>:</td>
                <td>{result.statistics.totalParticipants}</td>
              </tr>
              <tr>
                <td>Yes</td>
                <td>:</td>
                <td>{result.statistics.yesCount}</td>
              </tr>
              <tr>
                <td>No</td>
                <td>:</td>
                <td>{result.statistics.noCount}</td>
              </tr>
              <tr>
                <td>Maybe</td>
                <td>:</td>
                <td>{result.statistics.maybeCount}</td>
              </tr>
            </table>
            <div className="w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollModalContent;
