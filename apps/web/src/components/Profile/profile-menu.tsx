import {
  logOut,
  selectCurrentRole,
  selectUser,
} from "@/redux/features/auth/authSlice";
import { useGetBasicProfileQuery } from "@/redux/features/basicProfile/basicProfileApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Avatar, AvatarFallback, AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectUser);
  const current_role = useAppSelector(selectCurrentRole);
  const { data: profile } = useGetBasicProfileQuery(undefined);
  const navigate = useNavigate();
  const profileImage =
    profile?.data?.basicProfile?.profile_image?.secure_url || "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profileImage} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-[200px] text-center font-roboto *:cursor-pointer *:px-3 *:py-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigate(token ? "/profile" : "/login")}
        >
          View Profile
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Switch Profile</DropdownMenuItem> */}

        {current_role === "SUPER_ADMIN" && (
          <DropdownMenuItem onClick={() => navigate("/admin")}>
            Create Exclusive Content
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="flex gap-3"
          onClick={() => dispatch(logOut()) && navigate("/login")}
        >
          Log Out
          <CiLogout className="rotate-180" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
