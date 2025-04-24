import { GraduationCap } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <div className="grid w-full max-w-5xl items-end gap-8 md:grid-cols-2">
        <div className="hidden flex-col justify-center space-y-5 md:flex">
          <div className="space-y-2">
            <div className="-ml-2 flex flex-col items-start justify-start">
              <GraduationCap
                className="size-20 text-primary"
                strokeWidth={1.5}
              />
              <div>
                <span className="text-[12rem] font-bold leading-none tracking-[0.2em] text-primary">
                  RISE
                </span>
                <p className="ml-2 text-xl font-bold tracking-wide text-primary">
                  Resilient International School for Self-esteem
                </p>
              </div>
            </div>
            <p className="text-sm">
              Online business school for empowering lives and businesses
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
              alt="Learning"
              className="h-[150px] w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-2xl border border-muted bg-card p-8 shadow-lg backdrop-blur-sm">
          <div className="mb-8 flex items-center justify-center space-x-2 md:hidden">
            <GraduationCap
              className="h-12 w-12 text-primary"
              strokeWidth={1.5}
            />
            <span className="text-4xl font-bold text-primary">RISE</span>
          </div>
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
