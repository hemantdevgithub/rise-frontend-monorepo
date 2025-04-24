import CommentCard from "@/components/Comments/CommentCard";
import LikeShare from "@/components/LikeShare/LikeShare";
import ContentDetailCard from "@/components/Shared/ContentDetailCard";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import SubHeading from "@/components/Shared/SubHeading";
import AddCommentsForm from "@/components/forms/AddCommentsForm";
import ResearchAndDevelopmentCard from "@/components/ui/research-and-development-card";
import { useGetCommentByContentIdQuery } from "@/redux/features/comment/commentApi";
import {
  useGetRecentResearchAndDevelopmentsQuery,
  useGetResearchAndDevelopmentDetailsQuery,
} from "@/redux/features/researchAndDevelopment/researchAndDevelopmentApi";
import React from "react";
import { useParams } from "react-router-dom";

const ResearchAndDevelopmentDetailPage: React.FC = () => {
  const { slug } = useParams();

  const { data: researchAndDevelopment, error: researchAndDevelopmentError } =
    useGetResearchAndDevelopmentDetailsQuery(slug as string);
  const {
    data: recentResearchAndDevelopments,

    isLoading: isRecentResearchAndDevelopmentsLoading,
  } = useGetRecentResearchAndDevelopmentsQuery(
    researchAndDevelopment?.data?.id,
    {
      skip: !researchAndDevelopment?.data?.id,
    }
  );
  const {
    data: comments,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useGetCommentByContentIdQuery(researchAndDevelopment?.data?.id, {
    skip: !researchAndDevelopment?.data?.id,
  });
  return (
    <div>
      <div className="flex gap-5">
        <div className="space-y-5 lg:w-[70%]">
          {researchAndDevelopmentError ? (
            <div>Something went wrong</div>
          ) : (
            <ContentDetailCard data={researchAndDevelopment?.data} />
          )}
          {/* Like share */}
          <LikeShare />
          {/* Comments */}
          <div className="space-y-5 rounded-md border p-6">
            <h2 className="flex gap-2 font-roboto text-xl font-semibold">
              <span>{comments && comments.data.length}</span>Comments
            </h2>
            {researchAndDevelopment && (
              <AddCommentsForm contentId={researchAndDevelopment?.data.id} />
            )}
            {isCommentLoading ? (
              <div>Loading Comments</div>
            ) : isCommentError ? (
              <div>Failed To Get Comments For this post</div>
            ) : (
              <>
                {comments && comments.data.length > 0 ? (
                  <div className="divide-y-2">
                    {comments.data.map((comment: any) => (
                      <CommentCard {...comment} />
                    ))}
                  </div>
                ) : (
                  <SubHeading className="text-center">
                    Be a first Commenter
                  </SubHeading>
                )}
              </>
            )}
          </div>
        </div>
        <div className="space-y-5 lg:w-[30%]">
          <h3 className="font-semibold">Explore More</h3>
          <div className="space-y-3">
            {isRecentResearchAndDevelopmentsLoading ? (
              <SkeletonCard />
            ) : (
              <>
                {recentResearchAndDevelopments?.data?.map(
                  (researchAndDevelopment: any) => (
                    <ResearchAndDevelopmentCard
                      key={researchAndDevelopment.id}
                      item={researchAndDevelopment}
                    />
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchAndDevelopmentDetailPage;
