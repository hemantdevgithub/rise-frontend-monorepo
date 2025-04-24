import ResearchTopicCard from "@/components/ui/research-topic-card";
import { UserRole } from "@/constants/roles";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetAllResearchTopicsQuery } from "@/redux/features/researchTopic/researchTopicApi";
import { useAppSelector } from "@/redux/hooks";
import type { TResearchTopic } from "@/types/research-topic.types";
import { Button } from "@repo/ui";
import { Loader, Plus } from "lucide-react";
import { type ReactNode } from "react";
import { Link } from "react-router-dom";

const ResearchTopicsPage = () => {
  const user = useAppSelector(selectUser);
  const { data, isFetching, isError } = useGetAllResearchTopicsQuery(undefined);

  let content: ReactNode;
  const topics = (data?.data as TResearchTopic[]) || [];

  if (isFetching) {
    content = (
      <div className="flex h-56 w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex h-56 w-full items-center justify-center">
        <p className="text-sm text-red-300">
          Failed to retrieve research topics.
        </p>
      </div>
    );
  } else if (!topics.length) {
    content = (
      <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <Plus className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-medium">No research topics found</p>
          <p className="text-sm text-muted-foreground">
            Get started by creating a new research topic.
          </p>
        </div>
        <Link to="/add/add-research-topic">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Research Topic
          </Button>
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.map((topic) => (
          <ResearchTopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Research Topics</h1>
        {user?.role === (UserRole.ADMIN || UserRole.SUPER_ADMIN) && (
          <Link to="/add/add-research-topic">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Research Topic
            </Button>
          </Link>
        )}
      </div>
      {content}
    </div>
  );
};

export default ResearchTopicsPage;
