"use client";

import type React from "react";

import { formatDistanceToNow, isValid } from "date-fns";
import {
  BookmarkPlus,
  Calendar,
  Heart,
  Loader,
  MessageSquare,
  Share2,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useGetResearchBySlugQuery } from "@/redux/features/research/researchApi";
import { TResearch } from "@/types/research.types";
import {
  Avatar, AvatarFallback, AvatarImage, Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, ScrollArea, Separator, Textarea
} from "@repo/ui";
import { formatDate, getName } from "../research-topic-insights-page";

// Mock data for the research
const mockResearch = {
  comments: [
    {
      id: "comment-001",
      author: "Jane Smith",
      authorAvatar: "/placeholder.svg?height=30&width=30",
      content:
        "Great research! I particularly found the comparison between CNNs and Vision Transformers insightful.",
      date: "2025-04-12T14:30:00.000Z",
      likes: 5,
    },
    {
      id: "comment-002",
      author: "Michael Johnson",
      authorAvatar: "/placeholder.svg?height=30&width=30",
      content:
        "I wonder if you considered the energy consumption aspects of these models? That would be an interesting addition to the research.",
      date: "2025-04-15T11:45:00.000Z",
      likes: 3,
    },
    {
      id: "comment-003",
      author: "Sarah Williams",
      authorAvatar: "/placeholder.svg?height=30&width=30",
      content:
        "Have you tried applying these techniques to medical imaging? I'd be curious about the results.",
      date: "2025-04-18T16:20:00.000Z",
      likes: 2,
    },
  ],
};

// Mock data for related research
const mockRelatedResearch = [
  {
    id: "rel-001",
    title: "Reinforcement Learning in Autonomous Systems",
    author: "Dr. Emily Chen",
    publishedDate: "2025-03-15T10:30:00.000Z",
    tags: ["Machine Learning", "Reinforcement Learning", "Autonomous Systems"],
    likes: 38,
  },
  {
    id: "rel-002",
    title: "Generative Adversarial Networks for Image Synthesis",
    author: "Prof. Robert Wilson",
    publishedDate: "2025-03-28T14:45:00.000Z",
    tags: ["Machine Learning", "GANs", "Computer Vision"],
    likes: 27,
  },
  {
    id: "rel-003",
    title: "Transfer Learning for Natural Language Processing",
    author: "Dr. Lisa Brown",
    publishedDate: "2025-04-05T09:20:00.000Z",
    tags: ["Machine Learning", "NLP", "Transfer Learning"],
    likes: 31,
  },
];

export default function ResearchDetailPage() {
  const { slug } = useParams();

  const { data, isFetching, isError } = useGetResearchBySlugQuery(slug);
  const research = data?.data as TResearch;
  // State
  const [relatedResearch] = useState(mockRelatedResearch);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(mockResearch.comments);

  // Helper function to safely get relative time
  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return "Unknown time";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error calculating relative time:", error);
      return "Unknown time";
    }
  };

  // Handle like toggle
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  // Handle save toggle
  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  // Handle share
  const handleShare = () => {
    // In a real app, you would implement proper sharing functionality
    navigator.clipboard.writeText(window.location.href);
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      author: "Current User", // In a real app, this would be the logged-in user
      authorAvatar: "/placeholder.svg?height=30&width=30",
      content: commentText,
      date: new Date().toISOString(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // Handle comment like
  const handleCommentLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  if (isFetching) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex h-56 w-full items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-56 w-full items-center justify-center">
        <p className="text-sm text-red-300">
          Failed to retrieve research topics.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="space-y-5">
              <CardTitle className="text-3xl">{research.title}</CardTitle>
              <CardDescription className="mt-2 flex items-center">
                <div className="flex items-center">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage
                      src={"/placeholder.svg"}
                      alt={"Author image"}
                    />
                    <AvatarFallback>
                      {research.author.basicProfile.first_name.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {getName(research.author)}
                    </p>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-4 h-8" />
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(research.createdAt, "MMMM d, yyyy")}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose min-w-full"
                dangerouslySetInnerHTML={{
                  __html: research.content,
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center ${isLiked ? "text-red-500" : ""}`}
                  onClick={handleLikeToggle}
                >
                  <Heart
                    className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{40}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                  onClick={() =>
                    document
                      .getElementById("comments-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <MessageSquare className="mr-1 h-4 w-4" />
                  <span>{comments.length}</span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center ${isSaved ? "text-primary" : ""}`}
                  onClick={handleSaveToggle}
                >
                  <BookmarkPlus
                    className={`mr-1 h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  <span>Save</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                  onClick={handleShare}
                >
                  <Share2 className="mr-1 h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Comments Section */}
          <Card className="mt-6" id="comments-section">
            <CardHeader>
              <CardTitle className="text-xl">
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button type="submit">Post Comment</Button>
                </div>
              </form>

              <Separator />

              {/* Comments List */}
              {comments.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarImage
                              src={comment.authorAvatar || "/placeholder.svg"}
                              alt={comment.author}
                            />
                            <AvatarFallback>
                              {comment.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {comment.author}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {getRelativeTime(comment.date)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleCommentLike(comment.id)}
                        >
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                      </div>
                      <p className="pl-10 text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Related Research */}
        <div className="lg:col-span-1">
          <div className="space-y-5">
            <div>
              <CardTitle className="text-xl">Related Research</CardTitle>
            </div>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-5">
                  {relatedResearch.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-2 text-base">
                          <Link
                            to={`/research/${item.id}`}
                            className="hover:underline"
                          >
                            {item.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="flex items-center text-xs">
                          <User className="mr-1 h-3 w-3" />
                          {item.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {formatDate(
                              item.publishedDate as any,
                              "MMM d, yyyy"
                            )}
                          </span>
                          <div className="flex items-center">
                            <Heart className="mr-1 h-3 w-3" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}
