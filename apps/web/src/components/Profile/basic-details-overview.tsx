import { useUploadBasicProfileImageMutation } from "@/redux/features/basicProfile/basicProfileApi";
import { TBasicProfile } from "@/types";
import { AiOutlineMail } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { SlLocationPin, SlPhone, SlStar, SlUser } from "react-icons/sl";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { toast } from "sonner";
import { Badge } from "@repo/ui";
import ProfileImageUpload from "./profile-image-upload";

const BasicDetailOverview = ({
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
  const [uploadImage] = useUploadBasicProfileImageMutation();

  const handleImageUpload = async (image: File) => {
    if (!image) {
      return null;
    }
    const toastId = toast.loading("Uploading Image", { duration: 3000 });
    try {
      const formData = new FormData();
      formData.append("profileImage", image);
      const response = await uploadImage(formData).unwrap();
      if (response.success) {
        toast.success("Profile Image Uploaded", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong while uploading image", {
        id: toastId,
      });
    }
  };
  return (
    <div className="relative flex items-center gap-8 rounded-md border p-3 dark:bg-black">
      {/* <div className="col-span-4 flex flex-col items-center p-6 rounded-lg">
        <div className="relative w-36 h-36 mb-4">
          <img
            className="w-full h-full object-cover rounded-full border-4 border-empower shadow-lg"
            src={profileImage}
            alt="profile image"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 p-2 bg-empower rounded-full cursor-pointer hover:bg-rise shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className={`btn btn-primary w-full py-2 text-black rounded-md shadow-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-rise hover:bg-empower hover:text-white"}`}
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
     */}
      <div className="flex">
        <ProfileImageUpload
          handleUploadImage={handleImageUpload}
          userImage={profileImage}
          className="size-[150px]"
        />
      </div>
      <div className="h-full">
        <div className="flex h-full flex-col justify-evenly space-y-3">
          <h2 className="flex items-center gap-5">
            <SlUser className="text-xl" />
            <span className="font-roboto font-semibold text-tommyBlue dark:text-white">
              {basicProfile?.first_name && basicProfile?.last_name
                ? `${basicProfile?.first_name} ${basicProfile?.last_name}`
                : "Not Added"}
            </span>
          </h2>
          <h2 className="flex items-center gap-5">
            <AiOutlineMail className="text-xl" />
            <span>{email}</span>
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
            <SlPhone className="text-xl" />
            <span>
              {basicProfile?.phone_number
                ? basicProfile.phone_number
                : "Not Added"}
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
            <SlLocationPin className="text-xl" />
            <span>
              {basicProfile?.current_address?.country
                ? `${basicProfile.current_address.address_line}, 
              ${basicProfile.current_address.state}, 
              ${basicProfile.current_address.country}`
                : "Not Added"}
            </span>
          </h2>
        </div>
        <Badge className="absolute -right-3 -top-2 flex gap-2 border capitalize">
          <SlStar />
          {currentRole?.toLowerCase()}
        </Badge>
      </div>
    </div>
  );
};

export default BasicDetailOverview;
