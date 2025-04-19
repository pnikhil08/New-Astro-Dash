"use client";
import styles from "@/app/UI/features/Offer/offer.module.css";
import { useState } from "react";
import { AntSwitch } from "../../SwitchButton/AntSwitch";
// import useFilteredSearch from "@/hooks/useFilteredSearch";

const Offers = () => {
  const [status, setStatus] = useState(0);
  const astroid = "37741";


  const handleToggle = async () => {
    const newStatus = status === 0 ? 1 : 0;
    setStatus(newStatus);

    try {
      const token = localStorage.getItem("accessToken");

      const postData = {
        astroid: astroid,
        status: newStatus.toString(),
      };

      console.log("Sending data:", postData);

      const response = await fetch("/api/offerprice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.status === 200) {
        alert(result.message);
      } else {
        alert("Error updating offer status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`${styles["card-panel-permi"]} flex items-center justify-center flex-col gap-4`}
    >
      <h2 className={`${styles["wallet-head"]} text-center py-5`}>Offers</h2>

      <div className={`${styles[""]} w-[100%]`}>
        <hr />
        <div
          className={`${styles["tab-content"]} ${styles["b-feed-user"]} pt-3 h-screen flex justify-around`}
        >
          <div className={`${styles["tab-pane"]} fade show active`} id="all">
            <div
              className={`${styles["astro-main-ser"]} flex flex-wrap justify-center md:justify-between`}
            >
              <div
                className={`${styles["panel-access-box"]} flex items-start justify-between flex-col overflow-hidden `}
              >
                <div
                  className={`${styles["bg-glass"]}  flex items-center justify-between flex-col`}
                >
                  <div
                    className={`${styles[""]} w-[15rem] sm:w-[20rem]   h-[3rem] flex items-start justify-between`}
                  >
                    <div className={`${styles["sp-fl"]} flex   justify-between`}>
                      <span className={`${styles["p-a-t"]} flex items-center`}>
                        <span className={`${styles["p-a-type"]} text-[.6rem] md:text-[.8rem]`}>
                          Offer Name:{" "}
                        </span>
                        <h3 className={`${styles["top-greet"]} mb-0 text-[.6rem] md:text-[.8rem]`}>₹ 5</h3>
                      </span>
                    </div>
                    <div
                      className={`${styles["sp-fl"]} flex items-center justify-between`}
                    >
                      <span className={`${styles["p-a-t"]} flex items-center`}>
                        <span className={`${styles["p-a-type"]} text-[.6rem] md:text-[.8rem]`}>
                          User Type :{" "}
                        </span>
                        <h3 className={`${styles["top-greet"]} mb-0 text-[.6rem] md:text-[.8rem]`}>
                          All User
                        </h3>
                      </span>
                  
                    </div>
                  </div>

                  <span className={`${styles["p-a-t"]} flex items-center`}>
                    <span className={`${styles["p-a-type"]} text-[.8rem] md:text-[.9rem]`}>Status: </span>
                    <div className="form-check form-switch">
                      <AntSwitch
                        checked={status === 1}
                        onChange={handleToggle}
                      />
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;

// "use client"
// import styles from '@/app/UI/features/Offer/offer.module.css'
// import { useState } from 'react';
// import Image from 'next/image';
// import { AntSwitch } from '../../SwitchButton/AntSwitch';

// const Offers = () => {
//   // State to track the active tab
//   const [activeTab, setActiveTab] = useState('all'); // 'all' corresponds to "Call & Chats" tab

//   // Function to handle tab switching
//   const handleTabClick = (tabId) => {
//     setActiveTab(tabId);
//   };

//   return (
//     <div className={`${styles["card-panel-permi"]} flex items-center justify-center flex-col mx-10 `}>
//       <h2 className={`${styles["wallet-head"]} text-center m-2 `}>Offers</h2>

//       <div className={`${styles["card-body"]} product-hr `}>
//         <form action="" method="post" id="assign_call_charges" name="assign_call_charges">
//         <ul className={`${styles["nav"]} ${styles["nav-pills"]} ${styles["pr-list"]} flex items-center justify-center`} id="pills-tab" role="tablist">
//             {/* <li className={`${styles["nav-item"]} mr-7  mb-1`} role="presentation">
//               <a
//                 className={`${styles["nav-link"]} ${styles["p-r-a"]} flex items-center ${activeTab === 'all' ? 'active' : ''}`}
//                 id="call-tab-charges"
//                 onClick={() => handleTabClick('all')}
//               >
//                 <span className={`${styles["pr-txt"]}  `}>Call & Chats</span>
//               </a>
//             </li>
//             <li className={`${styles["nav-item"]}`} role="presentation">
//               <a
//                 className={`${styles["nav-link"]} ${styles["p-r-a"]} flex items-center ${activeTab === 'status' ? 'active' : ''}`}
//                 id="video-call-tab-charges"
//                 onClick={() => handleTabClick('status')}
//               >
//                 <span className={`${styles["pr-txt2"]} ml-[-22]`}>Others</span>
//               </a>
//             </li> */}
//           </ul>
//         </form>

//         <hr />
//         <div className={`${styles["tab-content"]} ${styles["b-feed-user"]} h-screen `} id="pills-tabContent">
//           {/* Tab for "Call & Chats" */}
//           { (
//             <div className={`${styles["tab-pane"]} fade show active`}id="all">
//               <div className={` ${styles["astro-main-ser"]} flex flex-wrap justify-between`}>
//                 {/* Content for "Call & Chats" */}
//               <div className={` ${styles["panel-access-box"]}  flex items-center justify-between flex-col`}>
//                   <div className={`${styles["bg-glass"]} flex items-center justify-between flex-col`}>
//                     <div className={`${styles["sp-off"]} flex flex-wrap justify-between`}>
//                       <div className={`${styles["sp-fl"]} flex items-center justify-between`}>
//                         <span className={`${styles["p-a-t"]} flex items-center`}>
//                           <span className={`${styles["p-a-type"]}`}>Offer Name : </span>
//                           <h3 className={`${styles["top-greet"]} mb-0`}>₹ 5</h3>
//                         </span>
//                         {/* <span className={`${styles["p-a-t"]} flex items-center`}>
//                           <span className={`${styles["p-a-type"]}`}>Display Name :</span>
//                           <h3 className={`${styles["top-greet"]} mb-0`}>75%</h3>
//                         </span> */}
//                       </div>
//                       <div className={`${styles["sp-fl"]} flex items-center justify-between`}>
//                         <span className={`${styles["p-a-t"]} flex items-center`}>
//                           <span className={`${styles["p-a-type"]}`}>User Type : </span>
//                           <h3 className={`${styles["top-greet"]} mb-0`}>All User</h3>
//                         </span>
//                         <span className={`${styles["p-a-t"]} flex items-center`}>
//                           {/* <span className={`${styles["p-a-type"]}`}>India : My Share :</span>
//                           <h3 className={`${styles["top-greet"]} mb-0`}>$ 2.00</h3> */}
//                         </span>
//                       </div>
//                       <div className={`${styles["sp-fl"]} flex items-center justify-between`}>
//                         <span className={`${styles["p-a-t"]} flex items-center`}>
//                           {/* <span className={`${styles["p-a-type"]}`}>At Share : </span>
//                           <h3 className={`${styles["top-greet"]} mb-0`}>$ 2.00</h3> */}
//                         </span>
//                         <span className={`${styles["p-a-t"]} flex items-center`}>
//                           {/* <span className={`${styles["p-a-type"]}`}>Customer Pays :</span>
//                           <h3 className={`${styles["top-greet"]} mb-0`}>$ 2.00</h3> */}
//                         </span>
//                       </div>
//                     </div>
//                     <span className={`${styles["p-a-t"]} flex items-center`}>
//                       <span className={`${styles["p-a-type"]}`}>Status : </span>
//                       <div className="form-check form-switch">
//                         {/* <input
//                           className="form-check-input"
//                           type="checkbox"
//                           role="switch"
//                           id="flexSwitchCheckDefault"
//                         /> */}
//                         <AntSwitch/>
//                       </div>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Repeat for other panels as needed */}

//               </div>
//             </div>
//           )}

//           {/* Tab for "Others" */}
//           {/* {activeTab === 'status' && (
//             <div className=" fade show active  flex justify-center place-items-center  " id="status">
//               <div className="">
//                 <div className=" flex items-center justify-center flex-col">

//                   <span className="">No Announcement Yet</span>
//                 </div>
//               </div>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Offers;
