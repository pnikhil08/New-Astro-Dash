"use client";
import styles from "@/app/UI/features/myReview/review.module.css";
import { FaFlag, FaReply } from "react-icons/fa6";
import { MdPushPin } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import BasicPagination from "../../PaginationUI/Pagination";
import useFilteredSearch from "@/hooks/useFilteredSearch";

import { useGetReviewApiQuery } from "@/app/redux/slice/getReviewSlice";
import { FadeLoader } from "react-spinners";

export default function Review() {
  const [Page, setPage] = useState(1);
  const { data = [], isLoading, error, isFetching } = useGetReviewApiQuery(Page);
  const recordList = data?.data || [];
  const filteredData = useFilteredSearch(recordList, [
    "user.name",
    "user_id",
    "orderid",
    "item_type",
  ]);
  const pagination = data || {};

  const [filter, setFilter] = useState("all");
  const [isMounted, setIsMounted] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState({});
  const [replies, setReplies] = useState({});
  const [editingReply, setEditingReply] = useState({});
  const [replyTimestamps, setReplyTimestamps] = useState({});
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      const initialReplies = {};
      data.data.forEach((review) => {
        initialReplies[review.id] = review.Astroreply || "";
      });

    setReplies((prevReplies) => {
      const isSame =
        JSON.stringify(prevReplies) === JSON.stringify(initialReplies);
      return isSame ? prevReplies : initialReplies;
    });
  }
  }, [data]);
  const handleReplyClick = (reviewId) => {
    setShowReplyBox((prev) => ({ ...prev, [reviewId]: true }));
    setEditingReply((prev) => ({ ...prev, [reviewId]: false }));
  };

  const handleCancelReply = (reviewId) => {
    setShowReplyBox((prev) => ({ ...prev, [reviewId]: false }));
    setEditingReply((prev) => ({ ...prev, [reviewId]: false }));
  };

  const handleReplyChange = (reviewId, text) => {
    const currentTime = new Date().toLocaleString();
    setReplies((prev) => ({ ...prev, [reviewId]: text }));
    setReplyTimestamps((prev) => ({ ...prev, [reviewId]: currentTime }));
  };

  const handleSubmitReply = async (reviewId) => {
    if (!replies[reviewId]?.trim()) {
      return alert("Please enter a reply before submitting.");
    }

    try {
      const token = localStorage.getItem("accessToken");
      const replyData = {
        review_id: reviewId,
        astroreply: replies[reviewId],
      };

      // console.log("Sending reply:", replyData);

      const response = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(replyData),
      });

      const data = await response.json();
      // console.log("Reply submitted successfully:", data);

      setReplies((prev) => ({
        ...prev,
        [reviewId]: replyData.astroreply,
      }));

      setShowReplyBox((prev) => ({ ...prev, [reviewId]: false }));

      alert("Reply submitted successfully!");
    } catch (err) {
      // console.error("Error submitting reply:", err);
      alert("Failed to submit reply. Please try again.");
    }
  };

  const handleEditReply = (reviewId) => {
    setEditingReply((prev) => ({ ...prev, [reviewId]: true }));
    setShowReplyBox((prev) => ({ ...prev, [reviewId]: true }));
    setReplies((prev) => ({ ...prev, [reviewId]: prev[reviewId] || "" }));
  };
  const handleDeleteReply = async (reviewId) => {
    if (!reviewId) return alert("Invalid reply ID.");

    const confirmDelete = confirm(
      "Are you sure you want to delete this reply?"
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`/api/deleteMyReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ review_id: reviewId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete reply: ${response.statusText}`);
      }

      setReplies((prev) => ({ ...prev, [reviewId]: "" }));
      alert("Reply deleted successfully!");
    } catch (err) {
      console.error("Error deleting reply:", err);
      alert("Failed to delete reply.");
    }
  };

  if (!isMounted) return null;
  if (isLoading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <FadeLoader color="#2f1254" height={17} width={5} />
        <div className="mt-2">Loading call history...</div>
      </div>
    );

  return (
    <div
      className={`${styles["my-review-main"]} flex flex-col items-center justify-center `}
    >
      <h2 className={`${styles["wallet-head"]} text-center`}>My Reviews</h2>

      <div className={`${styles["top-down"]} flex items-center flex-col`}>
        <div
          className={`${styles["review-select"]} flex gap-2 md:gap-[15rem]  justify-between p-0`}
        >
          <select
            className={`${styles["custom-select"]} bg-gray-100`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Show All Reviews</option>
            <option value="Chat">Chat</option>
            <option value="Call">Call</option>
          </select>
          <select
            className={`${styles["custom-select"]} bg-gray-100`}
            defaultValue="all"
          >
            <option>My Reviews</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
      </div>

      <div className={`${styles["review-cond"]}`}>
        <span className="flex items-center justify-between">
          <span className={`${styles["fl-spn"]}`}>Flagged Review</span>
          <span className={`${styles["fl-spn"]}`}>Excluded PO & SO</span>
          <span className={`${styles["fl-spn"]}`}>3</span>
        </span>
        <span className="flex items-center justify-between">
          <span className={`${styles["fl-spn"]}`}>
            Missed Call & Chat Review
          </span>
          <span className={`${styles["fl-spn"]}`}>13</span>
        </span>
        <span className="flex items-center justify-between">
          <span className={`${styles["fl-spn"]}`}>
            <b>Used Balance</b>
          </span>
          <span className={`${styles["fl-spn"]}`}>
            <b>15/16</b>
          </span>
        </span>
        <span className="flex items-center justify-between">
          <span className={`${styles["fl-spn"]}`}>
            <b>Note:</b> System gives you a maximum of 90 flags. Inclusive of
            missed call and chat.
          </span>
        </span>
      </div>

      <div
        className={`${styles["store-his-box"]} flex items-start flex-wrap py-3 gap-10`}
      >
        {filteredData.map((review) => {
          const finalRating = parseFloat(review.rating) || 0;
          const ratingColor =
            finalRating < 3 ? "red" : finalRating > 3.5 ? "#32cd32" : "default";
          return (
            <div
              key={review.id}
              className={`${styles["card-review"]} flex flex-col`}
            >
              <div
                className={`${styles["call-top"]} flex items-center justify-between`}
              >
                <div className="flex items-start justify-between flex-col">
                  <span className={`${styles["store-top"]} flex items-center`}>
                    <span className={`${styles["odr-sp"]}`}>Name:</span>{" "}
                    <span className={`${styles["id-nm"]}`}>
                      {review.user?.name || "Unknown"} ({review.user_id})
                    </span>
                  </span>
                  <span className={`${styles["store-top"]} flex items-center`}>
                    <span className={`${styles["odr-sp"]}`}>Order ID :</span>{" "}
                    <span className={`${styles["id-nm"]}`}>
                      {review.orderid || "N/A"}
                    </span>
                  </span>
                </div>
                <div
                  className={`${styles["cal-od-id"]} flex items-end justify-between flex-col`}
                >
                  <Link href="#" className={`${styles["rev-det"]}`}>
                    <FaFlag />
                  </Link>
                  <Link href="#" className={`${styles["rev-det"]}`}>
                    <MdPushPin />
                  </Link>
                </div>
              </div>
              <hr style={{ margin: ".1rem" }} />
              <div
                className={`${styles["cal-od-rev"]}  flex items-center justify-between`}
              >
                <div className="">
                  <span className={`${styles["odr-sp"]} `}>Type :</span>{" "}
                  <span className={`${styles["id-nm"]} `}>
                    {review.item_type}
                  </span>
                </div>
                <div>
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      value={finalRating}
                      precision={0.5}
                      readOnly
                      sx={{
                        "& .MuiRating-iconFilled": { color: ratingColor },
                      }}
                    />
                  </Stack>
                </div>
              </div>
              <div
                className={`${styles["cal-od-id"]} flex items-center justify-between`}
              >
                <span className={`${styles["odr-sp"]}`}>
                  {new Date(review.user?.updated_at).toLocaleString()}
                  {console.log(review.user?.updated_at)}
                </span>
              </div>
              <div className={`${styles["call-card-det"]} flex flex-col`}>
                <span className={`${styles["rev-span"]}`}>
                  <b>Comment:</b>
                </span>
                <p className={`${styles["rev-astro"]} mb-0`}>
                  {review.comments || "No comments available."}
                </p>
              </div>
              <div
                className={`${styles["xtra-rem"]} flex items-center justify-between`}
              >
                {!replies[review.id] && !showReplyBox[review.id] && (
                  <button
                    onClick={() => handleReplyClick(review.id)}
                    className={`${styles["xtra-rev23"]} mt-2 bg-success cursor-pointer text-xs text-white py-1 px-3 rounded-lg bg-[#7e60bf] `}
                  >
                    Reply
                  </button>
                )}

                {(review.Astroreply || replies[review.id]) && (
                  <>
                    {!showReplyBox[review.id] && (
                      <div
                        className={`${styles["reply-section"]} mt-1 p-2 pt-0 rounded w-full bg-gray-300`}
                      >
                        <span className="font-semibold text-[.75rem]">
                          Reply:{" "}
                          <span className="font-light text-[.7rem]">
                            {replyTimestamps[review.id]
                              ? new Date(
                                  replyTimestamps[review.id]
                                ).toLocaleString()
                              : new Date(review.updated_at).toLocaleString()}
                          </span>
                        </span>

                        <div className="text-[.75rem] p-1">
                          {replies[review.id] || review.Astroreply}
                        </div>

                        <div className="flex justify-between">
                          <button
                            onClick={() => handleEditReply(review.id)}
                            className="mt-2 cursor-pointer text-xs text-white py-1 px-3 rounded-lg bg-[#7e60bf]"
                          >
                            Edit Reply
                          </button>
                          <button
                            onClick={() => handleDeleteReply(review.id)}
                            className="mt-2 cursor-pointer text-xs text-white py-1 px-3 rounded-lg bg-gray-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {showReplyBox[review.id] && (
                  <div className="mt-2 w-full">
                    <textarea
                      className="w-full bg-white border p-2 rounded"
                      rows="3"
                      placeholder="Write your reply here..."
                      value={replies[review.id]}
                      onChange={(e) =>
                        handleReplyChange(review.id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleSubmitReply(review.id)}
                      className="mt-2 bg-success cursor-pointer text-xs text-white py-1 px-3 rounded-lg bg-[#7e60bf]"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => handleCancelReply(review.id)}
                      className="bg-gray-400 cursor-pointer text-xs text-white py-1 px-3 mx-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <BasicPagination
        currentPage={pagination?.current_page || 1}
        totalPages={pagination?.last_page || 1}
        onPageChange={(newPage) => setPage(newPage)}
        siblingCount={1}
  boundaryCount={1}
  showInfo={true}
  isLoading={isFetching}
      />
      {isFetching && (
        <div className="mt-2 text-sm text-gray-500">Loading Page...</div>
      )}
      
    </div>
  );
}


// "use client";

// import styles from "@/app/UI/features/myReview/review.module.css";
// import { FaFlag, FaReply } from "react-icons/fa6";
// import { MdPushPin } from "react-icons/md";
// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Rating from "@mui/material/Rating";
// import Stack from "@mui/material/Stack";
// import { useGetReviewApiQuery } from "@/app/redux/slice/getReviewSlice";
// import { FadeLoader } from "react-spinners";

// export default function Review() {
//   const { data = [], isLoading, error } = useGetReviewApiQuery();
//   const [mounted, setMounted] = useState(false);

//   const [replies, setReplies] = useState({});
//   const [showReplyBox, setShowReplyBox] = useState({});
//   const [editingReply, setEditingReply] = useState({});
//   const [filter, setFilter] = useState("all");


//   // Hydration-safe rendering
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Memoize and initialize replies from API response
//   useEffect(() => {
//     if (data?.length > 0) {
//       const initialReplies = data.reduce((acc, review) => {
//         acc[review.id] = review.Astroreply || "";
//         return acc;
//       }, {});
//       setReplies(initialReplies);
//     }
//   }, [data]);

//   const handleReplyClick = (id) => {
//     setShowReplyBox((prev) => ({ ...prev, [id]: true }));
//     setEditingReply((prev) => ({ ...prev, [id]: false }));
//   };

//   const handleEditReply = (id) => {
//     setEditingReply((prev) => ({ ...prev, [id]: true }));
//     setShowReplyBox((prev) => ({ ...prev, [id]: true }));
//   };

//   const handleCancelReply = (id) => {
//     setShowReplyBox((prev) => ({ ...prev, [id]: false }));
//     setEditingReply((prev) => ({ ...prev, [id]: false }));
//   };

//   const handleReplyChange = (id, text) => {
//     setReplies((prev) => ({ ...prev, [id]: text }));
//   };

//   const handleSubmitReply = async (id) => {
//     const replyText = replies[id]?.trim();
//     if (!replyText) return alert("Please enter a reply.");

//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await fetch("/api/reply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({
//           review_id: id,
//           astroreply: replyText,
//         }),
//       });

//       if (!response.ok) throw new Error("Submit failed");
//       setShowReplyBox((prev) => ({ ...prev, [id]: false }));
//       setEditingReply((prev) => ({ ...prev, [id]: false }));
//       alert("Reply submitted!");
//     } catch {
//       alert("Failed to submit reply.");
//     }
//   };

//   const handleDeleteReply = async (id) => {
//     if (!confirm("Delete this reply?")) return;

//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await fetch("/api/deleteMyReview", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({ review_id: id }),
//       });

//       if (!response.ok) throw new Error("Delete failed");
//       setReplies((prev) => ({ ...prev, [id]: "" }));
//       alert("Reply deleted!");
//     } catch {
//       alert("Failed to delete reply.");
//     }
//   };

//   if (!mounted) return null;

//   if (isLoading) {
//     return (
//       <div className="h-screen flex flex-col justify-center items-center">
//         <FadeLoader color="#2f1254" height={17} width={5} />
//         <p className="mt-2">Loading reviews...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 mt-10">
//         Failed to load reviews. Try again later.
//       </div>
//     );
//   }

//   return (
//     <div className={`${styles["my-review-main"]} flex flex-col items-center justify-center`}>
//       <h2 className={`${styles["wallet-head"]} text-center`}>My Reviews</h2>

//       {/* Filters */}
//       <div className={`${styles["top-down"]} flex items-center flex-col`}>
//         <div className={`${styles["review-select"]} flex gap-2 md:gap-[15rem] justify-between p-0`}>
//           <select
//             className={`${styles["custom-select"]} bg-gray-100`}
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="all">Show All Reviews</option>
//             <option value="Chat">Chat</option>
//             <option value="Call">Call</option>
//           </select>
//           <select className={`${styles["custom-select"]} bg-gray-100`} defaultValue="all">
//             <option>My Reviews</option>
//             <option value="Positive">Positive</option>
//             <option value="Negative">Negative</option>
//           </select>
//         </div>
//       </div>

//       {/* Static Info Section */}
//       <div className={`${styles["review-cond"]}`}>
//         <div className="flex justify-between">
//           <span className={styles["fl-spn"]}>Flagged Review</span>
//           <span className={styles["fl-spn"]}>Excluded PO & SO</span>
//           <span className={styles["fl-spn"]}>3</span>
//         </div>
//         <div className="flex justify-between">
//           <span className={styles["fl-spn"]}>Missed Call & Chat Review</span>
//           <span className={styles["fl-spn"]}>13</span>
//         </div>
//         <div className="flex justify-between">
//           <span className={styles["fl-spn"]}>
//             <b>Used Balance</b>
//           </span>
//           <span className={styles["fl-spn"]}>
//             <b>15/16</b>
//           </span>
//         </div>
//         <span className={styles["fl-spn"]}>
//           <b>Note:</b> Max 90 flags. Inclusive of missed call & chat.
//         </span>
//       </div>

//       {/* Review Cards */}
//       <div className={`${styles["store-his-box"]} flex flex-wrap py-3 gap-10`}>
//         {data.map((review) => {
//           const finalRating = parseFloat(review.rating) || 0;
//           const ratingColor =
//             finalRating < 3 ? "red" : finalRating > 3.5 ? "#32cd32" : "default";
//           const replyText = replies[review.id];
//           const showBox = showReplyBox[review.id];

//           return (
//             <div key={review.id} className={`${styles["card-review"]} flex flex-col`}>
//               {/* Top Info */}
//               <div className={`${styles["call-top"]} flex justify-between`}>
//                 <div className="flex flex-col">
//                   <span className={styles["store-top"]}>
//                     <span className={styles["odr-sp"]}>Name:</span>{" "}
//                     <span className={styles["id-nm"]}>
//                       {review.user?.name || "Unknown"} ({review.user_id})
//                     </span>
//                   </span>
//                   <span className={styles["store-top"]}>
//                     <span className={styles["odr-sp"]}>Order ID:</span>{" "}
//                     <span className={styles["id-nm"]}>{review.orderid || "N/A"}</span>
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <Link href="#" className={styles["rev-det"]}>
//                     <FaFlag />
//                   </Link>
//                   <Link href="#" className={styles["rev-det"]}>
//                     <MdPushPin />
//                   </Link>
//                 </div>
//               </div>

//               <hr className="my-1" />

//               {/* Type & Rating */}
//               <div className="flex justify-between">
//                 <span>
//                   <span className={styles["odr-sp"]}>Type:</span>{" "}
//                   <span className={styles["id-nm"]}>{review.item_type}</span>
//                 </span>
//                 <Stack spacing={1}>
//                   <Rating
//                     name="half-rating-read"
//                     value={finalRating}
//                     precision={0.5}
//                     readOnly
//                     sx={{
//                       "& .MuiRating-iconFilled": { color: ratingColor },
//                     }}
//                   />
//                 </Stack>
//               </div>

//               {/* Date */}
//               <div className="text-xs text-right">
//                 {new Date(review.user?.updated_at).toLocaleString()}
//               </div>

//               {/* Comment */}
//               <div className={`${styles["call-card-det"]} flex flex-col`}>
//                 <span className={styles["rev-span"]}>
//                   <b>Comment:</b>
//                 </span>
//                 <p className={styles["rev-astro"]}>{review.comments || "No comments available."}</p>
//               </div>

//               {/* Reply Section */}
//               <div className="flex flex-col gap-2 mt-2">
//                 {!replyText && !showBox && (
//                   <button
//                     onClick={() => handleReplyClick(review.id)}
//                     className="bg-[#7e60bf] text-xs text-white py-1 px-3 rounded-lg"
//                   >
//                     Reply
//                   </button>
//                 )}

//                 {(review.Astroreply || replyText) && !showBox && (
//                   <div className="bg-gray-300 p-2 rounded">
//                     <div className="text-xs font-semibold">
//                       Reply:{" "}
//                       <span className="font-light">
//                         {replyTimestamps[review.id]
//                           ? new Date(replyTimestamps[review.id]).toLocaleString()
//                           : new Date(review.updated_at).toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="text-xs py-1">{replyText || review.Astroreply}</div>
//                     <div className="flex justify-between">
//                       <button
//                         onClick={() => handleEditReply(review.id)}
//                         className="bg-[#7e60bf] text-white text-xs px-3 py-1 rounded"
//                       >
//                         Edit Reply
//                       </button>
//                       <button
//                         onClick={() => handleDeleteReply(review.id)}
//                         className="bg-gray-500 text-white text-xs px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {showBox && (
//                   <div className="w-full">
//                     <textarea
//                       className="w-full border p-2 rounded"
//                       rows="3"
//                       placeholder="Write your reply..."
//                       value={replyText}
//                       onChange={(e) => handleReplyChange(review.id, e.target.value)}
//                     />
//                     <div className="mt-2 flex gap-2">
//                       <button
//                         onClick={() => handleSubmitReply(review.id)}
//                         className="bg-[#7e60bf] text-white text-xs px-3 py-1 rounded"
//                       >
//                         Submit
//                       </button>
//                       <button
//                         onClick={() => handleCancelReply(review.id)}
//                         className="bg-gray-400 text-white text-xs px-3 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
