import CommentCard from "@/components/Comments/CommentCard";
import LikeShare from "@/components/LikeShare/LikeShare";
import ContentDetailCard from "@/components/Shared/ContentDetailCard";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import SubHeading from "@/components/Shared/SubHeading";
import AddCommentsForm from "@/components/forms/AddCommentsForm";
import LessonArticleCard from "@/components/ui/lesson-article-card";
import SelectCategory from "@/components/ui/select-category";
import {
  useGetArticleDetailsQuery,
  useGetRecentArticlesQuery,
} from "@/redux/features/articles/articleApi";
import { useGetCommentByContentIdQuery } from "@/redux/features/comment/commentApi";
import React from "react";
import { useParams } from "react-router-dom";

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { data: article, error: articleError } = useGetArticleDetailsQuery(
    slug as string
  );
  const {
    data: recentArticles,
    isError,
    isLoading: isRecentArticleLoading,
  } = useGetRecentArticlesQuery(undefined);
  const {
    data: comments,
    isLoading,
    isError: isCommentError,
  } = useGetCommentByContentIdQuery(article?.data?.id);
  return (
    <div>
      <div className="flex gap-5">
        <div className="space-y-5 lg:w-[70%]">
          {articleError ? (
            <div>Something went wrong</div>
          ) : (
            <ContentDetailCard data={article?.data} />
          )}

          {/* Like share */}
          <LikeShare />
          {/* Comments */}
          <div className="space-y-5 rounded-md border p-6">
            <h2 className="flex gap-2 from-tommyBlue font-roboto text-xl font-semibold">
              <span>{comments && comments.data.length}</span>Comments
            </h2>
            {article && <AddCommentsForm contentId={article?.data.id} />}
            {isLoading ? (
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
        <div className="space-y-4 lg:w-[30%]">
          <SelectCategory />
          <div>
            <h3>Recent Articles</h3>
            {isError ? (
              <div className="m-5 flex h-[400px] items-center justify-center rounded-md bg-gray-200 font-roboto text-2xl font-semibold">
                Something Went Wrong Please Come Back Later
              </div>
            ) : (
              <div className="space-y-3">
                {isRecentArticleLoading ? (
                  <SkeletonCard />
                ) : (
                  <>
                    {recentArticles?.data?.map((journal: any) => (
                      <LessonArticleCard
                        module="articles"
                        key={journal.id}
                        item={journal}
                      />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
