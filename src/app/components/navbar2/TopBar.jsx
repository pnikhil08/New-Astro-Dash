"use client";
import styles from '@/app/components/navbar2/navbar2.module.css'
import { useState } from "react";
import { useGetExpertProfileDetailsQuery } from "@/app/redux/slice/profileApi";
import { FaSearch } from "react-icons/fa";
// import { useSearch } from "@/app/ContextAPi/SearchContext";
import { useSearch } from '@/ContextAPi/SearchContext';


const TopBar = () => {
    const { data, error, isLoading } = useGetExpertProfileDetailsQuery();
    const { searchQuery, setSearchQuery } = useSearch();
    const profileData = data?.profileData || {};
  


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`${styles.topMainDash} flex  mb-5 mt-24 md:pr-[7rem] md:p-5  justify-between`}>
      <h3 className={`${styles.topGreetH3} text-xl font-semibold`}>
        Hello <span className={styles.nameDy}>{profileData.name}</span>
      </h3>
      <span className={`${styles.dashSpanInp} flex items-center`}>
        <input
          type="search"
          className={styles.dashInp}
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <i className="fa-solid fa-magnifying-glass">
          <FaSearch />
        </i>
      </span>
    </div>
  );
};

export default TopBar;



// "use client";
// import styles from '@/app/components/navbar2/navbar2.module.css';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetExpertProfileDetailsQuery } from "@/app/redux/slice/profileApi";
// import { FaSearch } from "react-icons/fa";

// const TopBar = () => {
//   const { data } = useGetExpertProfileDetailsQuery();
//   const profileData = data?.profileData || {};
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/logout", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       const result = await res.json();
//       console.log("Logout result:", result);

//       if (res.ok) {
//         localStorage.removeItem("accessToken");
//         router.push("/");
//       } else {
//         alert("Logout failed: " + result.message);
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className={`${styles.topMainDash} flex mb-5 mt-24 md:px-5 justify-between`}>
//       <h3 className={`${styles.topGreetH3} text-xl font-semibold`}>
//         Hi <span className={styles.nameDy}>{profileData.name}</span>
//       </h3>

//       <span className={`${styles.dashSpanInp} flex items-center`}>
//         <input
//           type="search"
//           className={styles.dashInp}
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search..."
//         />
//         {/* 🔴 Make this trigger logout */}
//         <FaSearch
//           className="ml-2 cursor-pointer text-purple-800 hover:text-red-600"
//           onClick={handleLogout}
//           title="Logout"
//         />
//       </span>
//     </div>
//   );
// };

// export default TopBar;
