import CompletionSection from "@/components/Onboarding/CompletionSection";
import RoleSelection from "@/components/Onboarding/role-selection";
import { useGetBasicProfileQuery } from "@/redux/features/basicProfile/basicProfileApi";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const OnboardingPage = () => {
  const { data, isFetching } = useGetBasicProfileQuery(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && data?.data?.role) {
      navigate("/lessons");
    }
  }, [data, isFetching, navigate]);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {isFetching ? (
        <div>Loading</div>
      ) : data?.data?.basicProfile === null ? (
        <RoleSelection />
      ) : (
        <CompletionSection />
      )}
    </div>
  );
};

export default OnboardingPage;
