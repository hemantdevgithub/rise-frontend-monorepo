import { SidebarFooter, SidebarMenuButton } from "@repo/ui";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logOut, selectUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@repo/ui";
import { LogInIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AppSidebarFooter = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  // const { data: myProfileData } = useGetBasicProfileQuery(undefined);
  // const basicProfile =
  //   (myProfileData?.data.basicProfile as TBasicProfile) || {};

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out.");
    try {
      const response = await logout(undefined).unwrap();
      if (response.success) {
        dispatch(logOut());
        toast.success("Successfully logged out.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to Logged out.", {
        id: toastId,
      });
    }
  };
  return (
    <SidebarFooter>
      {user ? (
        <div className="flex gap-2 *:w-full">
          <Button onClick={handleLogout} variant={"destructive"}>
            <LogOut />
            Logout
          </Button>
        </div>
      ) : (
        <SidebarMenuButton
          onClick={() => navigate("/login")}
          size="lg"
          className="h-fit border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center gap-3">
            <LogInIcon size={18} />
            <span className="font-semibold">Login</span>
          </div>
        </SidebarMenuButton>
      )}
    </SidebarFooter>
  );
};
// const AppSidebarFooter = () => {
//   const [logout] = useLogoutMutation();
//   const user = useAppSelector(selectUser);
//   const navigate = useNavigate();
//   const { data: myProfileData } = useGetBasicProfileQuery(undefined);
//   const basicProfile =
//     (myProfileData?.data.basicProfile as TBasicProfile) || {};

//   const dispatch = useAppDispatch();

//   const handleLogout = async () => {
//     const toastId = toast.loading("Logging out.");
//     try {
//       const response = await logout(undefined).unwrap();
//       if (response.success) {
//         dispatch(logOut());
//         toast.success("Successfully logged out.", {
//           id: toastId,
//         });
//       }
//     } catch (error) {
//       toast.error("Failed to Logged out.", {
//         id: toastId,
//       });
//     }
//   };
//   return (
//     <SidebarFooter>
//       <SidebarMenu>
//         <SidebarMenuItem>
//           {user?.userId ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton
//                   size="lg"
//                   className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//                 >
//                   <Avatar className="h-8 w-8 rounded-lg">
//                     {/* <AvatarImage src={prof} alt={data.user.name} /> */}
//                     <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                   </Avatar>
//                   <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-semibold">
//                       {basicProfile?.first_name} {basicProfile?.last_name}
//                     </span>
//                     <span className="truncate text-xs">
//                       {myProfileData?.data?.email}
//                     </span>
//                   </div>
//                   <ChevronsUpDown className="ml-auto size-4" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//                 side="bottom"
//                 align="end"
//                 sideOffset={4}
//               >
//                 <DropdownMenuLabel className="p-0 font-normal">
//                   <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                     <Avatar className="h-8 w-8 rounded-lg">
//                       {/* <AvatarImage src={prof} alt={data.user.name} /> */}
//                       <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                     </Avatar>
//                     <div className="grid flex-1 text-left text-sm leading-tight">
//                       <span className="truncate font-semibold">
//                         {basicProfile?.first_name} {basicProfile?.last_name}
//                       </span>
//                       <span className="truncate text-xs">
//                         {myProfileData?.data?.email}
//                       </span>
//                     </div>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem
//                     onClick={() => navigate("/profile")}
//                     className="flex items-center gap-3"
//                   >
//                     <LucideUser />
//                     Profile
//                   </DropdownMenuItem>
//                   {user.role === UserRole.SUPER_ADMIN && (
//                     <DropdownMenuItem
//                       onClick={() => navigate("/admin")}
//                       className="flex items-center gap-3"
//                     >
//                       <User />
//                       Admin Dashboard
//                     </DropdownMenuItem>
//                   )}
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   className="flex items-center gap-3"
//                 >
//                   <LogOut />
//                   Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <SidebarMenuButton
//               onClick={() => navigate("/login")}
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//             >
//               <Avatar className="h-8 w-8 rounded-sm">
//                 <LogIn />
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="mb-2 text-lg font-semibold">Login</span>
//               </div>
//             </SidebarMenuButton>
//           )}
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarFooter>
//   );
// };

export default AppSidebarFooter;
