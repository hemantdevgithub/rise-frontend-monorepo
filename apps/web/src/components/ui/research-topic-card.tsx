import { UserRole } from "@/constants/roles";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TResearchTopic } from "@/types/research-topic.types";
import {
  Badge, Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@repo/ui";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { GoGraph } from "react-icons/go";
import { Link } from "react-router-dom";
import { TopicDetailsDialog } from "./topic-detail-dialog";

const ResearchTopicCard = ({ topic }: { topic: TResearchTopic }) => {
  const user = useAppSelector(selectUser);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const openTopicDetails = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const closeTopicDetails = () => {
    setSelectedTopicId(null);
  };
  return (
    <>
      <Card
        key={topic.id}
        className="overflow-hidden transition-all hover:shadow-md"
      >
        <CardHeader className="pb-3">
          <div className="mb-3 flex items-center justify-between">
            <Badge
              variant={
                topic.status === "OPEN"
                  ? "default"
                  : topic.status === "CLOSED"
                    ? "success"
                    : "secondary"
              }
            >
              {topic.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Posted{" "}
              {formatDistanceToNow(new Date(topic.postedDate), {
                addSuffix: true,
              })}
            </span>
          </div>
          <CardTitle className="line-clamp-1 text-xl">{topic.name}</CardTitle>
          <CardDescription className="line-clamp-2 h-10">
            {topic.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                ${topic.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Due {format(new Date(topic.duration), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>at {format(new Date(topic.duration), "h:mm a")}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openTopicDetails(topic.id)}
          >
            View Details
          </Button>
          {user?.role === UserRole.RESEARCHER && (
            <Link to={`/research-topics/${topic.id}/submit`}>
              <Button disabled={topic.status !== "OPEN"} size="sm">
                {topic.status === "OPEN" ? "Submit" : "Closed"}
              </Button>
            </Link>
          )}
          {user?.role === (UserRole.ADMIN || UserRole.SUPER_ADMIN) && (
            <Link to={`/research-topics/${topic.id}/insights`}>
              <Button size="sm">
                View Insights <GoGraph />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      {selectedTopicId && (
        <TopicDetailsDialog
          topicId={selectedTopicId}
          isOpen={!!selectedTopicId}
          onClose={closeTopicDetails}
        />
      )}
    </>
  );
};

export default ResearchTopicCard;
