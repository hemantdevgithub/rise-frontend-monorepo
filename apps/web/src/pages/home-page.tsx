import { Badge, Card } from "@repo/ui";
import { Link } from "react-router-dom";

export interface TrainingItem {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
  color: string;
  badgeText: string;
}

const trainings: TrainingItem[] = [
  {
    id: 1,
    title: "Social Mission",
    description:
      "Join us in making a positive impact on society through education",
    image: "/sight.png",
    href: "/social-mission",
    color: "bg-rose-100 dark:bg-rose-950",
    badgeText: "Make a Difference",
  },
  {
    id: 2,
    title: "Trainings",
    description: "Enhance your skills with our comprehensive training programs",
    image: "/education.png",
    href: "/lessons",
    color: "bg-emerald-100 dark:bg-emerald-950",
    badgeText: "Learn & Grow",
  },
];
export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center rounded-xl bg-background p-6">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        {trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
}

type TrainingCardProps = {
  training: TrainingItem;
};

export function TrainingCard({ training }: TrainingCardProps) {
  return (
    <Link to={training.href} className="group block">
      <Card
        className={`relative overflow-hidden border-none p-6 drop-shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
      >
        <Badge variant="secondary" className="mb-4 font-medium">
          {training.badgeText}
        </Badge>

        <div className="flex items-start justify-between">
          <div className="w-[60%] space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {training.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {training.description}
            </p>
          </div>

          <div className="relative w-[40%]">
            <img
              src={training.image}
              alt={training.title}
              className="size-28 object-cover"
            />
          </div>
        </div>

        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-foreground/5 blur-3xl transition-all duration-300 group-hover:bg-foreground/10" />
      </Card>
    </Link>
  );
}
