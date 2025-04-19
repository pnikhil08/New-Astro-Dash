"use client";
import {  useGetStoreQuery } from '@/app/redux/slice/storeSlice';
import styles from '@/app/UI/features/StoreHistoryCard/storeHistory.module.css'
import  { useState } from "react";
import { FadeLoader } from 'react-spinners';
import useFilteredSearch from "@/hooks/useFilteredSearch";

const StoreHistoryCard = () => {
  
  const { data, error, isLoading } = useGetStoreQuery();
  const [selectedStore, setSelectedStore] = useState(null);
  const openModal = (card) => {
    setSelectedStore(card);
  };

 
  const closeModal = () => {
    setSelectedStore(null);
  };
  const product = data?.products || {};
  const filteredData = useFilteredSearch(product, [
    "username",
    "user_id",
    "order_id",
    "product_name",
    "status",
    "created_at",
  ]);
  if (isLoading) return (
    <div className="h-screen flex flex-col justify-center items-center">
      <FadeLoader color="#2f1254" height={17} width={5} />
      <div className="mt-2">Loading call history...</div>
    </div>
  );
  if (error) return <p>Error fetching Remedy data.</p>;
  if (!data) return <p>API Response is undefined</p>;
 
  return (
    <div className={`${styles["calling-his"]} flex items-center justify-between flex-col  gap-2`}>
      <h2 className={`${styles["wallet-head"]} wallet-head text-center`}>Dhwani Astro Store</h2>

      <div className={`${styles["store-his-box"]} flex flex-wrap md:grid-cols-4  py-5   gap-10`}>
        {filteredData.map((card) => (
          <div className={`${styles["card-store"]} sm:w-[14rem] flex flex-col`} key={card.order_id}>
            <div className={`${styles["call-top"]} flex items-start justify-between`}>
              <div className={`${styles["cal-od-str"]} flex items-start justify-between flex-col`}>
                <span className={`${styles["store-top"]} flex flex-col md:flex-col xl:gap-[0.6rem] xl:flex-row xl:items-center`}>
                  <span className={`${styles["odr-sp"]} flex`}>Order ID :</span>
                  <span className={`${styles["id-nm"]}`}>{card.order_id}</span>
                </span>
                <span className={`${styles["store-top"]} flex flex-col md:flex-col xl:gap-[0.6rem] xl:flex-row xl:items-center`}>
                  <span className={`${styles["odr-sp"]} flex`}>Name:</span>
                  <span className={`${styles["id-nm"]}`}>{card.username} {`(${card.user_id})`}</span>
                </span>
              </div>


              {/* <div className={`${styles["cal-od-det"]} flex items-end justify-between flex-col`}>
                <button onClick={() => openModal(card)} className={styles["str-det"]}>
                  Details
                </button>
              </div> */}
            </div>

            <hr style={{ margin: ".1rem" }} />

            <div className={`${styles["call-card-det"]} flex items-center justify-between`}>
              <div className={`${styles["cal-od-id"]} flex flex-col sm:gap-[0.6rem] sm:flex-row sm:items-center sm:justify-between`}>
                <span className={`${styles["odr-sp"]}`}>Product :</span>
                <span className={`${styles["id-nm"]}`}>{card.product_name}</span>
              </div>
              {/* <div className={`${styles["cal-od-id"]} flex items-center justify-between`}>
                <span className={`${styles["odr-sp"]}`}>Quantity :</span>
                <span className={`${styles["id-nm"]}`}>{card.quantity}</span>
              </div> */}
            </div>

            <div className={`${styles["call-rate"]} flex justify-between`}>
              <div className={`${styles["cal-od-id"]} flex flex-col sm:gap-[0.6rem]  sm:flex-row sm:items-center sm:justify-between`}>
                <span className={`${styles["odr-sp"]}`}>Status :</span>
                <span className={`${styles["id-nm"]} text-danger ${styles["text-danger"]}`}>
                  {card.status}
                </span>
              </div>
            </div>

            <div className={`${styles["call-dr"]} flex items-center justify-between`}>
              <div className={`${styles["cal-od-id"]} flex items-center justify-between`}>
                <span className={`${styles["odr-sp"]}`}>{card.created_at}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedStore && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#0000009a]">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[400px]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              ✖
            </button>
            <h4 className="text-xl ">{selectedStore.product_name}</h4>
            {/* {console.log(selectedStore.productName)}
            {console.log(selectedStore.username)} */}
            <img
              src={selectedStore.product_image || "/default-image.jpg"}
              className="mt-4 w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreHistoryCard;
