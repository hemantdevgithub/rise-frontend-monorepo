import BasicDetailUpdateForm from "@/components/forms/basic-detail-update-form";
import BasicDetailOverview from "@/components/Profile/basic-details-overview";
import ProfileQuickLinks from "@/components/Profile/ProfileQuickLinks";
import { selectCurrentRole } from "@/redux/features/auth/authSlice";
import { useGetBasicProfileQuery } from "@/redux/features/basicProfile/basicProfileApi";
import { useAppSelector } from "@/redux/hooks";
import { TBasicProfile } from "@/types/basicProfile.types";
const ProfilePage = () => {
  const { data: myProfile, isFetching } = useGetBasicProfileQuery(undefined);
  const basicProfile: TBasicProfile = myProfile?.data.basicProfile;
  const current_role = useAppSelector(selectCurrentRole);

  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <div className="space-y-5">
      <div>
        <div className="flex min-h-[500px] w-full gap-10">
          <div className="space-y-5 font-poppins lg:w-[80%]">
            <BasicDetailOverview
              email={myProfile?.data?.email}
              basicProfile={basicProfile && basicProfile}
              currentRole={myProfile?.data?.current_role}
              email_verified={myProfile?.data?.email_verified}
            />
            <BasicDetailUpdateForm
              profile={basicProfile}
              email={myProfile?.data?.email}
            />
            {/* profiles data based on roles */}
          </div>
          <div className="hidden lg:block">
            {current_role === "SUPER_ADMIN" && <ProfileQuickLinks />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
