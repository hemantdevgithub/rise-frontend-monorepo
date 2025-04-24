import SkeletonCard from "@/components/Shared/SkeletonCard";
import ArticleCard from "@/components/ui/article-card";
import { useGetArticlesQuery } from "@/redux/features/articles/articleApi";
import { selectArticlesFilters } from "@/redux/features/filters/filters.slice";
import { useAppSelector } from "@/redux/hooks";
import { Empty } from "@repo/ui";
import queryString from "query-string";

const ArticlePage = () => {
  const { category } = useAppSelector(selectArticlesFilters);
  const query = queryString.stringify({ category });
  const { data: articles, isLoading, isError } = useGetArticlesQuery(query);
  return (
    <div className="space-y-5">
      <div>
        {isError ? (
          <div className="flex h-[400px] items-center justify-center rounded-md bg-gray-200 font-roboto text-2xl font-semibold">
            Something Went Wrong Please Come Back Later
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="">
                <SkeletonCard />
              </div>
            ) : (
              <>
                {articles && articles.data.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {articles?.data?.map((lesson: any) => (
                      <ArticleCard key={lesson.id} item={lesson} />
                    ))}
                  </div>
                ) : (
                  <Empty />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
