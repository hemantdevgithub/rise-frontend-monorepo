import CertificateDownload from "@/components/certificate/certificate-download";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useGetBasicProfileQuery } from "@/redux/features/basicProfile/basicProfileApi";
import { useGetUserCertificateByIdQuery } from "@/redux/features/certificate/certificateApi";
import { useGetLessonByIdQuery } from "@/redux/features/lesson/lessonApi";
import { TBasicProfile, TCertificate } from "@/types";
import { TLessonWithChapter } from "@/types/lesson.type";
import { useParams } from "react-router";

const CertificatePage = () => {
  const { certificateId } = useParams();
  const { data: certData, isFetching } =
    useGetUserCertificateByIdQuery(certificateId);

  const certificate = (certData?.data as TCertificate) || {};
  const { data: basicProfData } = useGetBasicProfileQuery(undefined);
  const basicProfile =
    (basicProfData?.data?.basicProfile as TBasicProfile) || {};
  const { data: lessonData } = useGetLessonByIdQuery(certificate?.lessonId, {
    skip: isFetching,
  });

  const lesson = lessonData?.data as TLessonWithChapter;

  const fullName =
    basicProfile?.first_name + " " + basicProfile?.last_name || "";

  if (isFetching) {
    return <SkeletonCard />;
  }
  return (
    <div>
      <CertificateDownload
        date={certificate?.createdAt!}
        title={lesson?.title}
        fullName={fullName}
        type={certificate?.type}
      />
    </div>
  );
};

export default CertificatePage;
