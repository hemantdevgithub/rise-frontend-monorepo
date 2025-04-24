"use client";

import {
    BookOpen,
    Calendar,
    Eye,
    Grid3x3,
    Heart,
    List,
    Loader,
    MessageSquare,
    Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGetAllResearchQuery } from "@/redux/features/research/researchApi";
import { TResearch } from "@/types/research.types";
import { extractHighlightOrAbstract } from "@/utility/utility";
import {
    Avatar, AvatarFallback, AvatarImage, Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input
} from "@repo/ui";
import { formatDate, getName } from "../research-topic-insights-page";
type ViewMode = "grid" | "list";

export default function ResearchListingPage() {
  const { data, isFetching, isError } = useGetAllResearchQuery(undefined);

  const researchPapers = (data?.data as TResearch[]) || [];
  // State
  const [filteredPapers, setFilteredPapers] =
    useState<TResearch[]>(researchPapers);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Filter and sort papers based on search query, selected tags, and sort option
  useEffect(() => {
    let result = [...researchPapers];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((paper) =>
        paper.title.toLowerCase().includes(query)
      );
    }

    setFilteredPapers(result);
  }, [researchPapers, searchQuery]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
  };

  // Handle view mode toggle
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
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
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Research Papers</h1>
          <p className="mt-1 text-muted-foreground">
            Discover the latest research in various fields
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-2 md:mt-0">
          <Button variant="outline" size="sm" onClick={toggleViewMode}>
            {viewMode === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid3x3 className="h-4 w-4" />
            )}
            <span className="ml-2">
              {viewMode === "grid" ? "List View" : "Grid View"}
            </span>
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search research papers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Research Papers Grid/List */}
      {filteredPapers.length === 0 ? (
        <div className="rounded-lg border bg-muted/10 py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">
            No research papers found
          </h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={clearFilters} className="mt-4">
            Clear All Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <Card
              key={paper.id}
              className="flex h-full flex-col overflow-hidden"
            >
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 text-xl">
                  <Link
                    to={`/search/research/${paper.id}`}
                    className="hover:underline"
                  >
                    {paper.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage
                      src={"/placeholder.svg"}
                      alt={"Author image"}
                    />
                    <AvatarFallback>
                      {paper.author.basicProfile.first_name.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{getName(paper.author)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pb-3">
                <p className="line-clamp-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground">
                  {extractHighlightOrAbstract(paper.content)}
                </p>
                {/* <div className="mt-4 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div> */}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{formatDate(paper.createdAt, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Heart className="mr-1 h-3 w-3" />
                      <span>{30}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      <span>{4}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/search/research/${paper.slug}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-grow p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage
                          src={"/placeholder.svg"}
                          alt={"Author image"}
                        />
                        <AvatarFallback>
                          {paper.author.basicProfile.first_name.charAt(0) ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {getName(paper.author)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(paper.createdAt, "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <h3 className="mb-2 text-xl font-semibold">
                      <Link
                        to={`/search/research/${paper.slug}`}
                        className="hover:underline"
                      >
                        {paper.title}
                      </Link>
                    </h3>
                    <p className="line-clamp-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground">
                      {extractHighlightOrAbstract(paper.content)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Heart className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{40}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{3}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{70}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/search/research/${paper.slug}`}>
                        View Research
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
