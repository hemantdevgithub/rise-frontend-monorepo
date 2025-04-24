import { TBasicProfile } from "@/types/basicProfile.types";
import { AiOutlineMail } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { SlLocationPin, SlPhone, SlStar, SlUser } from "react-icons/sl";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { Badge } from "@repo/ui";
const BasicDetailsOverview = ({
  basicProfile,
  currentRole,
  email,
  email_verified,
}: {
  basicProfile: TBasicProfile | undefined;
  currentRole: string;
  email: string;
  email_verified: boolean;
}) => {
  const profileImage =
    basicProfile?.profile_image?.url || import.meta.env.VITE_MOCK_PROFILE_IMG;
  return (
    <div className="relative flex items-center gap-10 rounded-md border p-5">
      <img
        className="size-[150px] rounded-md"
        src={profileImage}
        alt="profile image"
      />
      <div className="space-y-3">
        <h2 className="flex items-center gap-5">
          <SlUser className="text-xl" />{" "}
          <span className="font-roboto font-semibold text-tommyBlue">
            {basicProfile?.first_name && basicProfile?.last_name
              ? `${basicProfile?.first_name} ${basicProfile?.last_name}`
              : "Not Added"}
          </span>
        </h2>
        <h2 className="flex items-center gap-5">
          <AiOutlineMail className="text-xl" />{" "}
          <span className="">{email}</span>
          {email_verified ? (
            <Badge
              variant={"outline"}
              className="flex gap-2 border-2 bg-armyGreen text-white"
            >
              <MdVerified />
              Verified
            </Badge>
          ) : (
            <Badge variant={"destructive"} className="flex gap-2 border-2">
              <VscWorkspaceUnknown />
              Verify Now
            </Badge>
          )}
        </h2>
        <h2 className="flex items-center gap-5">
          <SlPhone className="text-xl" />{" "}
          <span className="">
            {basicProfile?.phone_number
              ? basicProfile.phone_number
              : "Not Added "}
          </span>
          {basicProfile?.phone_verified ? (
            <Badge
              variant={"outline"}
              className="flex gap-2 border-2 bg-armyGreen text-white"
            >
              <MdVerified />
              Verified
            </Badge>
          ) : (
            <Badge variant={"destructive"} className="flex gap-2 border-2">
              <VscWorkspaceUnknown />
              Verify Now
            </Badge>
          )}
        </h2>
        <h2 className="flex items-center gap-5">
          <SlLocationPin className="text-xl" />{" "}
          <span className="">
            {basicProfile?.current_address?.country
              ? `${basicProfile.current_address.address_line}, 
              ${basicProfile.current_address.state},
               ${basicProfile.current_address.country}`
              : "Not Added"}
          </span>
        </h2>
      </div>
      <Badge className="absolute -right-3 -top-2 flex gap-2 border bg-white capitalize text-tommyBlue hover:bg-white">
        <SlStar />
        {currentRole?.toLowerCase()}
      </Badge>
    </div>
  );
};

export default BasicDetailsOverview;
