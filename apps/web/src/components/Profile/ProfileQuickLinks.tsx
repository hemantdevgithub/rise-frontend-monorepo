import { Button } from "@repo/ui";
import { useNavigate } from "react-router";

const ProfileQuickLinks = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/admin/dashboard")}
      className="w-[20%] space-y-5 font-roboto *:cursor-pointer"
    >
      Create Exclusive Content
    </Button>
  );
};

export default ProfileQuickLinks;
