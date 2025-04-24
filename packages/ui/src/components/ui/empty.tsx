import { cn } from "@ui/lib/utils";
import { ClassValue } from "clsx";

export const Empty = ({ className }: { className?: ClassValue }) => {
  return (
    <div
      className={cn("flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center rounded-md", className)}
    >
      <svg
        width="128"
        height="82"
        viewBox="0 0 64 41"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
        aria-hidden="true"
      >
        <title>No data available</title>
        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
          <ellipse fill="hsl(var(--muted))" cx="32" cy="33" rx="32" ry="7" />
          <g fillRule="nonzero" stroke="hsl(var(--border))">
            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="hsl(var(--background))"
            />
          </g>
        </g>
      </svg>
      <p className="text-muted-foreground text-sm">No data available</p>
    </div>
  );
};
