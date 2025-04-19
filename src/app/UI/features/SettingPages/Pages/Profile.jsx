"use client";
import { useGetExpertProfileDetailsQuery } from "@/app/redux/slice/profileApi";
import styles from "@/app/UI/features/SettingPages/Pages/profile.module.css";
import ProfilUI from "@/app/UI/SettingUI/ProfileHeader";

export default function ProfileSettings() {
  const { data, error, isLoading } = useGetExpertProfileDetailsQuery();

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error fetching profile data.</p>;

  const profileData = data?.profileData || {};
  const languages = data?.languagess || {};
  const skills = data?.specialisationn || {};


  return (
    <>
     <div
      className={`${styles["calling-his"]} flex items-center justify-center flex-col `}
    >
    <div className="wallet-head text-center justify-center items-center">Profile Settings</div> 
   <ProfilUI/>
    
        
      {/* <h2 className="wallet-head text-center">Profile Settings</h2> */}
      <div className={`${styles["profile-page"]} flex`}>
       
     
        <div className="p-6 w-full bg-[#ffffff6e] shadow-md rounded-2xl max-w-full mx-auto">
          <h2 className="text-lg w-full font-semibold text-gray-800 mb-4">
            Profile Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4  text-gray-750 text-xs md:text-sm">
            <div className="flex-col  gap-2  ">
              <span className="  font-medium ">Real Name :</span>
              <span className="input-data">{profileData.full_name|| "N/A"}</span>
            </div>
            <div className="flex-col  gap-2 ">
              <span className="font-medium ">Display Name:</span>
              <span className="input-data">{profileData.profile_name_en || "N/A"}</span>
            </div>
            <div className="flex-col  gap-2">
              <span className="font-medium ">Skill:</span>
              <span className="input-data">{skills?.join(", ") || "N/A"}</span>

            </div>
            <div className="flex-col  gap-2">
              <span className="font-medium ">Language:</span>
              <span className="input-data">{languages?.join(", ") || "N/A"}</span>
            </div>
            <div className="flex-col  gap-2">
              <span className="font-medium ">Experience:</span>
              <span className="input-data">{profileData.experience || "N/A"}</span>
            </div>
            <div className="flex-col  gap-2">
              <span className="font-medium ">Current Address:</span>
              <span className="input-data">{profileData.address || "N/A"}</span>
            </div>
            <div className="flex-col  gap-2">
              <span className="font-medium ">City:</span>
              <span className="input-data">{profileData.city || "N/A"}</span>
            </div>
            <div className="flex-col  gap-2">
              <span className="font-medium ">Zip Code:</span>
              <span className="input-data">{profileData.zipcode || "N/A"}</span>
            </div>
            <div className="flex-col gap-2">
              <span className="font-medium ">State:</span>
              <span className="input-data">{profileData.state || "N/A"}</span>
            </div>
            <div className="flex-col gap-2">
              <span className="font-medium">Country:</span>
              <span className="input-data">{profileData.country || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

