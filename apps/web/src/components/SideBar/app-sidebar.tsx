"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui";

import { sidebarItems } from "@/constants/sidebaritems";
import { cn } from "@/lib/utils";
import {
  Button,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@repo/ui";
import { Link, NavLink, useLocation } from "react-router-dom";
import AppSidebarFooter from "./app-sidebar-footer";

export const iframeHeight = "800px";

export const description = "A sidebar that collapses to icons.";

export default function AppSidebar() {
  const { open } = useSidebar();
  const { pathname } = useLocation();
  // const user = useAppSelector(selectUser);
  // const role = user?.role || null;
  return (
    <Sidebar collapsible="icon" className="bg-secondary *:bg-secondary">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="flex h-fit items-center justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/RISELogo.png"
                  alt="rise-logo"
                  className={cn(open ? "size-8" : "size-8")}
                />

                <div className="grid flex-1 text-left text-xl leading-tight">
                  <span className="truncate font-semibold">RISE </span>
                </div>
              </div>
              <Link target="_blank" to={"https://empowerapp.netlify.app/"}>
                <Button size={"sm"}>Empower</Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Quick links</SidebarGroupLabel> */}
          <SidebarMenu className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive =
                item.url !== "/" && pathname.startsWith(item.url);
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item?.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <NavLink to={item.url}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={cn(
                            "dark:bono h-10 px-3 font-poppins font-semibold text-foreground/60 duration-300",
                            isActive &&
                              "border bg-background text-black drop-shadow dark:text-white"
                          )}
                        >
                          {item.icon && <item.icon size={22} />}
                          <span className="truncate text-base">
                            {item.title}
                          </span>
                          {item.items?.length && (
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </SidebarMenuButton>
                      </NavLink>
                    </CollapsibleTrigger>
                    {item?.items?.length && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item?.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        {/* {role === UserRole.SUPER_ADMIN ? (
          <SidebarGroup>
            <SidebarGroupLabel>Admin Menu</SidebarGroupLabel>
            <Link to={"/admin"}>
              <Button size={"sm"} className="w-full" variant={"outline"}>
                Admin Dashboard
              </Button>
            </Link>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <Link to={"/"}>
              <Button size={"lg"} className="w-full">
                Empower
              </Button>
            </Link>
          </SidebarGroup>
        )} */}
      </SidebarContent>
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
