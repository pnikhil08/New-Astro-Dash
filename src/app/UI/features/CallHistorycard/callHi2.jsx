"use client";
import styles from "@/app/UI/features/ChatHistoryCard/chatHistory.module.css";
import React from "react";
import { useGetCallHistoryQuery } from "@/app/redux/slice/callHis2Slice";
import { NotebookPen } from "lucide-react";

const CallHistoryCard2 = () => {
  const userId = 1723;
  const { data, error, isLoading } = useGetCallHistoryQuery(userId);

  if (isLoading) return <p>Loading call history...</p>;
  if (error) return <p>Error: {error.data?.message || "Something went wrong"}</p>;

  const callHistory = data?.data || [];

  return (
    <div className={`${styles.callingHis} flex flex-wrap items-center justify-center flex-col mx-10 gap-2`}>
      <h2 className="wallet-head text-center">Chat History</h2>

      <div className={`${styles.card} items-center flex flex-wrap justify-between py-5 gap-4`}>
        {callHistory.length > 0 ? (
          callHistory.map((card, index) => (
            <div className={`${styles.cardChat} flex flex-col`} key={index}>
              <div className={`${styles.callTop} flex items-center justify-between`}>
                <div className={`${styles.calOdId} flex items-center justify-between flex-col`}>
                  <span className={styles.odrSp}>Order ID :</span>
                  <span className={styles.idNm}>{card.call_session_id}</span>
                </div>
                <div className={`${styles.calOdId} flex items-center justify-between flex-col`}>
                  <span className={styles.odrSp}>Name:</span>
                  <span className={styles.idNm}>{card.client_name}</span>
                </div>
                <div className={`${styles.flRev} flex items-end justify-between flex-col`}>
                  <a href="#" className={styles.odrDots}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </a>
                  <NotebookPen />
                </div>
              </div>
              <hr style={{ margin: ".1rem" }} />
              <div className={styles.calMid}>
                <div className={`${styles.calMidTop} flex items-center justify-between`}>
                  <span className={styles.newInd}>{card.offer}</span>
                  <span className={`${styles.newIndOff} text-danger`}>{card.Status}</span>
                </div>
              </div>
              <div className={`${styles.callCardDet} flex items-center justify-between`}>
                <div className={`${styles.calOdId} flex items-center justify-between`}>
                  <span className={styles.odrSp}>Gender :</span>
                  <span className={styles.idNm}>{card.form_meta.gender}</span>
                </div>
              </div>
              <div className={`${styles.calOdId} flex items-center`}>
                <span className={styles.odrSp}>DOB :</span>
                <span className={styles.idNm}>{card.form_meta.bidate}</span>
              </div>
              <div className={`${styles.callRate} flex items-center justify-between`}>
                <div className={`${styles.calOdId} flex items-center justify-between`}>
                  <span className={styles.odrSp}>POB :</span>
                  <span className={styles.idNm}>{card.form_meta.birthPlace}</span>
                </div>
              </div>
              <div className={`${styles.callRate} flex items-center justify-between`}>
                <div className={`${styles.calOdId} flex items-center justify-between`}>
                  <span className={styles.odrSp}>TOB :</span>
                  <span className={styles.idNm}>{card.form_meta.bitime}</span>
                </div>
              </div>
              <div className={`${styles.callRate} flex items-center justify-between`}>
                <div className={`${styles.calOdId} flex items-center justify-between`}>
                  <span className={styles.odrSp}>Rate :</span>
                  <span className={styles.idNm}>₹ {card.expert_charges}</span>
                </div>
              </div>
              <div className={`${styles.callDr} flex items-center justify-between`}>
                <div className={`${styles.calOdId} flex items-center justify-between`}>
                  <span className={styles.odrSp}>Duration :</span>
                  <span className={styles.idNm}>{card.call_duration_used}</span>
                </div>
              </div>
              <div className={`${styles.callRate} flex items-center justify-between`}>
                <div className={`${styles.callDr} flex items-center justify-between`}>
                  <div className={`${styles.calOdId} flex items-center justify-between`}>
                    <span className={styles.odrSp}>Earning :</span>
                    <span className={styles.idNm}>₹ {card.Earning}</span>
                  </div>
                </div>
                <div className={`${styles.calOdId} flex items-center justify-between`}>
                  <span className={styles.odrSp}>Status :</span>
                  <span className={`${styles.idNm} ${card.call_status === "ANSWERED" ? styles.textSuccess : styles.textDanger}`}>
                    {card.call_status}
                  </span>
                </div>
              </div>
              <hr style={{ margin: ".1rem" }} />
              <div className={`${styles.cardRev} flex flex-col`}>
                <span className={styles.revSpan}>
                  <b>Review :</b>
                </span>
                <p className={`${styles.revAstro} mb-0`}>{card.Review}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No call history available.</p>
        )}
      </div>
    </div>
  );
};

export default CallHistoryCard2;
