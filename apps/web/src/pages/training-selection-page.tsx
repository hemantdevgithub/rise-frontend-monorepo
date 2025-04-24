import { FolderCard } from "@repo/ui";
import { Link } from "react-router-dom";
const trainings = [
  {
    id: 1,
    title: "Tierpreneurs Trainings",
    value: "tierpreneur",
    color: "bg-blue-900",
    items: [
      "What They Learn",
      "How They can empower",
      "How They can propel Startups & MSME",
    ],
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    title: "Startups & MSME Trainings",
    value: "startup",
    color: "bg-yellow-900",
    items: ["What They Learn & Understand", "How They can Achieve Success"],
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 3,
    title: "Impact Trainings",
    value: "impact",
    color: "bg-green-900",
    items: [
      "To Empower Workforce",
      "To Sponsor Entities",
      "How They can zero down the global social economic disparity",
    ],
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 4,
    title: "Supply Chain Trainings",
    value: "supply_chain",
    color: "bg-purple-900",
    items: ["Customer trainings", "Regulatory Trainings", "Investor Trainings"],
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 4,
    title: "Service Provider Trainings",
    value: "supply_chain",
    color: "bg-purple-900",
    items: ["For job seeking candidate", "Professional", "Consultants"],
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
];
const TrainingSelectionPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
        {trainings.map((training) => (
          <Link to={`/lessons-list/${training?.value}`}>
            <FolderCard
              key={training.id}
              title={training.title}
              items={training.items}
              color={training.color}
              avatars={training.avatars}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainingSelectionPage;
