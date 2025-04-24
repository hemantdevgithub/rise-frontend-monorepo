import { cn } from "@ui/lib/utils";
import { Card } from "./card";

interface FolderCardProps {
  title: string;
  items: string[];
  color: string;
  avatars: string[];
}

export function FolderCard({ title, items, avatars }: FolderCardProps) {
  return (
    <Card
      className={cn(
        "font-poppins relative mx-auto h-[200px] w-[350px] cursor-pointer overflow-hidden rounded-[5px_25px_25px_25px]"
      )}
    >
      <div className="bg-foreground/5 group-hover:bg-foreground/10 absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-all duration-300" />
      {/* Folder Body */}
      <div className={`h-full w-full space-y-3 rounded-lg px-6 pb-4 pt-6`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center text-sm">
              • {item}
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 right-4 flex -space-x-2">
          {avatars.map((_, index) => (
            <div key={index} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-blue-900">
              <img
                src={"https://t4.ftcdn.net/jpg/01/91/72/25/360_F_191722534_FhFBul7LwaGSlGIEgaMU7djKe24Y8EjE.jpg"}
                alt={`Avatar ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
