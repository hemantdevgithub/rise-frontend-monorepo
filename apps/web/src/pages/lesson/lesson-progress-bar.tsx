import {
  useGetUserLessonCertificateQuery,
  useRequestUserCertificateMutation,
} from "@/redux/features/certificate/certificateApi";
import { useGetUserSingleLessonProgressQuery } from "@/redux/features/userProgress/userProgressApi";
import { Badge, Button, Progress } from "@repo/ui";
import { FC } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type TLessonProgress = {
  lessonId: string;
  progressPercentage: string;
};

type TCertStatus = {
  certificateId: string;
  status: boolean;
};

type TLessonProgressProps = {
  lessonId: string;
};

export const LessonProgressBar: FC<TLessonProgressProps> = ({ lessonId }) => {
  const { data: lessonProgressData } = useGetUserSingleLessonProgressQuery(
    lessonId,
    {
      skip: !lessonId,
    }
  );

  const totalProgress = lessonProgressData?.data as TLessonProgress;
  const isProgressHundred =
    Number(totalProgress?.progressPercentage) === 100 || false;

  const { data: certData } = useGetUserLessonCertificateQuery(lessonId, {
    skip: !isProgressHundred,
  });
  const navigate = useNavigate();

  const cert = (certData?.data as TCertStatus) || {};
  const [requestCertificate, { isLoading: isCertLoading }] =
    useRequestUserCertificateMutation();
  const handleGenerateCertificate = async () => {
    if (cert.status) {
      return;
    }
    try {
      const response: any = await requestCertificate({
        type: "LESSON_ACHIEVEMENT",
        lessonId: totalProgress.lessonId,
      }).unwrap();
      if (response.success) {
        toast.success("Your certificate request has been generated!");
      }
    } catch (error: any) {
      console.log("object");
      toast.error(
        error?.data?.errorSources[0]?.message ||
          "Something went wrong try again later"
      );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-4 flex items-center gap-5">
        <Badge variant={"outline"}>
          {totalProgress?.progressPercentage ?? 0}%
        </Badge>
        <Progress value={Number(totalProgress?.progressPercentage)} />
        <Badge variant={"outline"}>100%</Badge>

        {isProgressHundred && cert.status && (
          <Button
            onClick={() => navigate(`/certificates/${cert.certificateId}`)}
            variant={"outline"}
            size={"sm"}
          >
            Open Certificate
          </Button>
        )}

        {isProgressHundred && !cert.status && (
          <Button
            disabled={isCertLoading || cert?.status}
            onClick={handleGenerateCertificate}
            variant={"outline"}
            size={"sm"}
          >
            Claim Certificate 🎉
          </Button>
        )}
      </div>
    </div>
  );
};
