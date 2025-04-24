import AppHeader from "@/components/header/app-header";
import AppSidebar from "@/components/SideBar/app-sidebar";
import ContextProviders from "@/providers/context-providers";
import OnboardingCheckingWrapper from "@/providers/onboarding-provider";
import { SidebarInset, SidebarProvider } from "@repo/ui";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <ContextProviders>
      <OnboardingCheckingWrapper>
        <SidebarProvider  >
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <hr />
            <div className="h-full w-full bg-background p-5">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </OnboardingCheckingWrapper>
    </ContextProviders>
  );
}
