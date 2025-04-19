"use client";
import styles from "@/app/UI/features/ChatHistoryCard/chatHistory.module.css";
import { NotebookPen } from "lucide-react";
import { FadeLoader } from "react-spinners";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import BasicPagination from "../../PaginationUI/Pagination";
import { useGetExpertCallHistoryQuery } from "@/app/redux/slice/callHistorySlice";
import useFilteredSearch from "@/hooks/useFilteredSearch";

const CallHistoryCard = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useGetExpertCallHistoryQuery(page);

  const filteredData = useFilteredSearch(data?.data, [
    "client_name",
    "call_session_id",
    "user_id",
  ]);

  const router = useRouter();
  const pagination = data?.pagination || {};
  const handleClick = (orderId) => {
    router.push(`/dashboard/callhistory/callNotes/${orderId}`);
  };
  
    const [showModal, setShowModal] = useState(false);
    const [remedyText, setRemedyText] = useState("");
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
  
    const handleSubmitRemedy = async () => {
      if (!remedyText.trim()) return alert("Please enter remedy");
  
      setSubmitting(true);
      try {
        const token = localStorage.getItem("accessToken"); 
  
        const response = await fetch("/api/suggestremady", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Suggrem: remedyText,
            request_session_id: selectedOrderId,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Remedy submitted successfully");
          setShowModal(false);
          setRemedyText("");
        } else {
          alert(result?.error || "Submission failed");
        }
      } catch (error) {
        console.error("Error submitting remedy:", error);
        alert("Something went wrong");
      } finally {
        setSubmitting(false);
      }
    };
    if (error) {
      return <p>Error fetching call history: {error?.data?.message || "Something went wrong"}</p>;
    }

  if (isLoading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <FadeLoader color="#2f1254" height={17} width={5} />
        <div className="mt-2">Loading call history...</div>
      </div>
    );

  return (
    <div
      className={`${styles.callingHis} flex flex-wrap items-center justify-self-center flex-col  gap-5`}
    >
      <h2 className="wallet-head text-center">Call History</h2>

      <div className={`${styles.card} items-center justify-center flex flex-wrap py-5 gap-4 md:justify-between`}>
        {data?.data?.length > 0 ? (
          filteredData.map((card) => (
            <div className={`${styles.cardChat} flex flex-col`} key={card.call_session_id}>
              <div className="flex justify-between">
                <div
                  className={`${styles.callTop} flex-col items-center justify-between`}
                >
                  <div className={`${styles.calOdId}  items-center`}>
                    <span className={styles.odrSp}>Order ID : </span>
                    <span className={styles.idNm}>{card.call_session_id}</span>
                  </div>
                  <div className={`${styles.calOdId} items-center  `}>
                    <span className={styles.odrSp}>Name : </span>
                    <span className={styles.idNm}>
                      {card.client_name} ({card.user_id})
                    </span>
                  </div>
                </div>
                <div
                 onClick={() => handleClick(card.call_session_id)}
                className={`${styles.flRev} flex items-end p-1 flex-col`}>
                  <NotebookPen />
                </div>
              </div>
              <hr style={{ margin: ".1rem" }} />
              <div className={styles.calMid}>
                <div
                  className={`${styles.calMidTop} flex items-center justify-between`}
                >
                  <span className={styles.newInd}>{card.offer}</span>
                  <span className={`${styles.newIndOff} text-danger`}>
                    {card.Status}
                  </span>
                </div>
              </div>
              <div
                className={`${styles.callCardDet} flex items-center justify-between`}
              >
                <div
                  className={`${styles.calOdId} flex items-center justify-between`}
                >
                  <span className={styles.odrSp}>Gender :</span>
                  <span className={styles.idNm}>{card.form_meta.gender}</span>
                </div>
              </div>
              <div className={`${styles.calOdId} flex items-center`}>
                <span className={styles.odrSp}>DOB :</span>
                <span className={styles.idNm}>{card.form_meta.bidate}</span>
              </div>
              <div
                className={`${styles.callRate} flex items-center justify-between`}
              >
                <div
                  className={`${styles.calOdId} flex items-center justify-between`}
                >
                  <span className={styles.odrSp}>POB :</span>
                  <span className={styles.idNm}>
                    {card.form_meta.birthPlace}
                  </span>
                </div>
              </div>
              <div
                className={`${styles.callRate} flex items-center justify-between`}
              >
                <div
                  className={`${styles.calOdId} flex items-center justify-between`}
                >
                  <span className={styles.odrSp}>TOB :</span>
                  <span className={styles.idNm}>{card.form_meta.bitime}</span>
                </div>
              </div>
              <div
                className={`${styles.callRate} flex items-center justify-between`}
              >
                <div
                  className={`${styles.calOdId} flex items-center justify-between`}
                >
                  <span className={styles.odrSp}>Rate :</span>
                  <span className={styles.idNm}>₹ {card.expert_charges}</span>
                </div>
              </div>
              <div
                className={`${styles.callDr} flex items-center justify-between`}
              >
                <div
                  className={`${styles.calOdId} flex items-center justify-between`}
                >
                  <span className={styles.odrSp}>Duration :</span>
                  <span className={styles.idNm}>{card.call_duration_used}</span>
                </div>
              </div>
              <div
                className={`${styles.callRate} flex items-center justify-between`}
              >
                <div
                  className={`${styles.callDr} flex items-center justify-between`}
                >
                  <div
                    className={`${styles.calOdId} flex items-center justify-between`}
                  >
                    <span className={styles.odrSp}>Earning :</span>
                    <span className={styles.idNm}>₹ {card.Earning}</span>
                  </div>
                </div>
                <div
                  className={`${styles.calOdId} flex items-center justify-between`}
                >
                  <span className={styles.odrSp}>Status :</span>
                  <span
                    className={`${styles.idNm} ${
                      card.call_status === "ANSWERED"
                        ? styles.textSuccess
                        : styles.textDanger
                    }`}
                  >
                    {card.call_status}
                  </span>
                </div>
              </div>
              <hr style={{ margin: ".1rem" }} />

              <div
                className={`${styles.xtraOp} flex items-center justify-between flex-wrap gap-2`}
              >
                <button
                onClick={() => {
                  setSelectedOrderId(card.request_session_id);
                  setShowModal(true);
                }}
                className={styles.xtraA}
              >
                Suggest Remedy
              </button>
                <a href="#" className={styles.xtraA}>
                  Open Kundli
                </a>
                {card.refund ? (
                  <a
                    href="#"
                    className={`${styles.xtraA} bg-danger bg-opacity-75 text-white`}
                  >
                    Refund Amount
                  </a>
                ) : null}
              </div>
              {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0000000d] bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <div className="text-[1rem] justify-self-center font-semibold mb-2">Suggest Remedy for Order ID: {selectedOrderId}</div>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows={4}
              placeholder="Enter remedy..."
              value={remedyText}
              onChange={(e) => setRemedyText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setRemedyText("");
                }}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRemedy}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
            </div>
          ))
        ) : (
          <p>No call history available.</p>
        )}
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
};

export default CallHistoryCard;
