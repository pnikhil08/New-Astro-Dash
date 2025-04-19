"use client";
import { useGetMyFollowerApiQuery } from '@/app/redux/slice/myFollower';
import styles from '@/app/UI/features/MyFollowe/follower.module.css';
import useFilteredSearch from "@/hooks/useFilteredSearch";

export default function Followers() {
  const userId = parseInt(localStorage.getItem("USER"));
  const { data, isLoading, error } = useGetMyFollowerApiQuery(userId);



  const users = data?.followers;
  const imagePath = data?.user_details?.image_path;
   const filteredData = useFilteredSearch(users, [
        "name",
        "user_id",
        
      ]);
      if (isLoading) return <p>Loading...</p>;
      if (error) return <p>Error loading user details</p>;

  if (! filteredData || filteredData.length === 0) return <p>No user details found.</p>;

  return (
    <div className={`${styles["astro-follower"]} flex  flex-col items-center justify-center gap-1 sm:gap-4 py-2 sm:py-5`}>
      <h2 className={`${styles["wallet-head"]} text-center`}>My Followers</h2>
      <div className={`${styles["follower-box"]}  grid grid-cols-2 py-5 sm:flex sm:flex-wrap gap4  sm:item-center`}>
        { filteredData.map((follower) => {
          const imageUrl = `http://webdemo.dhwaniastro.co.in${imagePath}${follower.image}`;
          return (
            <div key={follower.user_id} className={`${styles["follow-card"]}`}>
              <div className="flex flex-col items-center justify-between">
                <img
                  src={imageUrl}
                  alt={follower.name || "Unknown"}
                  // width={50}
                  // height={50}
                  className={`${styles["f-img"]}`}
                />
                <div className={`${styles["f-card-con"]} flex flex-col items-start justify-between`}>
                  <h3 className={`${styles["top-fll"]} text-black mb-0`}>{follower.name || "No Name"}</h3>
                  <small className={`${styles["top-fll"]} text-black`}>ID: {follower.user_id}</small>
                  {/* <small className={`${styles["top-fll"]} text-black`}>Date: {new Date(follower.created_at).toLocaleString()}</small> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
