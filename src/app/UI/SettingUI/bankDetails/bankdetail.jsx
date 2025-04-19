// "use client";
// import { useGetExpertProfileDetailsQuery } from "@/app/redux/slice/profileApi";
// import styles from "@/app/UI/features/SettingPages/Pages/profile.module.css";
// import ProfilUI from "../Profile";

// export default function Bankdetail() {
//   const { data, error, isLoading } = useGetExpertProfileDetailsQuery();

//   if (isLoading) return <p>Loading profile...</p>;
//   if (error) return <p>Error fetching profile data.</p>;

//   const profileData = data?.profileData || {};

//   return (
//     <>
//     <div
//       className={`${styles["calling-his"]} flex items-center justify-center flex-col mx-16`}
//     >
//       <h2 className="wallet-head text-center">Bank Details</h2>
//       <ProfilUI/>

//       <div className="p-6 w-full bg-white shadow-md rounded-2xl max-w-full mx-auto">
//           <h2 className="text-lg w-full font-semibold text-gray-800 mb-4">
//             Bank Information
//           </h2>
//           <div className="grid grid-cols-3 w-full gap-4 text-gray-750">
//             <div className="flex gap-2 ">
//               <span className="font-medium ">Bank Name:</span>
             
//               <span className="">{profileData.accountDetails?.bank_name || "N/A"}</span>
//             </div>

//           <div className="flex gap-2">
//         <span className="font-medium">Account Holder:</span>
//         <span>{profileData.accountDetails?.account_holder_name || "N/A"}</span>
//       </div>


//       <div className="flex gap-2">
//         <span className="font-medium">Account Number:</span>
//         <span>{profileData.accountDetails?.account_no || "N/A"}</span>
//       </div>
//       <div className="flex gap-2">
//         <span className="font-medium">IFSC Code:</span>
//         <span>{profileData.accountDetails?.bank_ifsc || "N/A"}</span>
//       </div>
//           </div>
//         </div>
//         </div>
//         </>
//         )}

"use client";
import { useGetExpertProfileDetailsQuery } from "@/app/redux/slice/profileApi";
import styles from "@/app/UI/features/SettingPages/Pages/profile.module.css";
import ProfilUI from "../ProfileHeader";

export default function Bankdetail() {
  const { data, error, isLoading } = useGetExpertProfileDetailsQuery();
  

  if (isLoading)
    return <p className="text-center text-gray-600 text-lg">Loading profile...</p>;

 
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">
        Error fetching profile data.
      </p>
    );


  const profileData = data?.profileData || {};
  const accountDetails = data?.accountDetails || {};

  return (
    <div className={`${styles["calling-his"]} flex flex-col items-center `}>
      <h2 className="wallet-head text-center">Bank Details</h2>
      <ProfilUI />

  
      <div className="p-6 w-full bg-[#ffffff6e] shadow-lg rounded-2xl  mx-auto border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Bank Information
        </h2>

      
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
          <BankDetailItem label="Bank Name" value={accountDetails.bank_name} />
          <BankDetailItem label="Account Holder" value={accountDetails.account_holder_name} />
          <BankDetailItem label="Account Number" value={accountDetails.account_no} />
          <BankDetailItem label="IFSC Code" value={accountDetails.bank_ifsc} />
        
          <BankDetailItem label="Pan Card" value={profileData.pancard_no} />
        </div>
      </div>
    </div>
  );
}


const BankDetailItem = ({ label, value }) => (
  <div className="flex-col gap-2">
    <div className="font-medium text-xs md:text-sm text-gray-900">{label} : </div>
    <span className="input-data ">{value || "N/A"}</span>
  </div>
);
