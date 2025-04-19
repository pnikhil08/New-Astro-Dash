"use client";
import styles from '@/app/UI/features/Offer/offer.module.css';
import { useState } from 'react';
import { AntSwitch } from '../../SwitchButton/AntSwitch';
import { useUpdateOfferPriceMutation } from '@/app/redux/slice/offerPrice';

const Of2 = () => {
  const astroid = "37741";
  const [status, setStatus] = useState(0);


  const [updateOfferPrice, { isLoading, error }] = useUpdateOfferPriceMutation();

  const handleToggle = async () => {
    const newStatus = status === 0 ? 1 : 0;
    setStatus(newStatus);

    try {
      const response = await updateOfferPrice({ astroid, status: newStatus.toString() }).unwrap();
      alert(response.message); 

      // fetch('http://webdemo.dhwaniastro.co.in/api/expert-offerprice', {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      //   },

      //   body : JSON.stringify({astroid, status: newStatus.toString()})
      // }).then(res => res.json()).then(data=>{
      //   console.log(data);
      // })
    } catch (err) {
      console.error("Error updating offer status:", err);
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`${styles["card-panel-permi"]} flex items-center justify-center flex-col mx-10`}>
      <h2 className={`${styles["wallet-head"]} text-center m-2`}>Offers</h2>

      <div className={`${styles["card-body"]} `}>
        <hr />
        <div className={`${styles["tab-content"]} ${styles["b-feed-user"]} h-screen`}>
          <div className={`${styles["tab-pane"]} fade show active`} id="all">
            <div className={`${styles["astro-main-ser"]} flex flex-wrap justify-between`}>
              <div className={`${styles["panel-access-box"]} flex items-center justify-between flex-col`}>
                <div className={`${styles["bg-glass"]} flex items-center justify-between flex-col`}>
                  <div className={`${styles["sp-off"]} flex flex-wrap justify-between`}>
                    <div className={`${styles["sp-fl"]} flex items-center justify-between`}>
                      <span className={`${styles["p-a-t"]} flex items-center`}>
                        <span className={`${styles["p-a-type"]}`}>Offer Name: </span>
                        <h3 className={`${styles["top-greet"]} mb-0`}>₹ 5</h3>
                      </span>
                    </div>
                    <div className={`${styles["sp-fl"]} flex items-center justify-between`}>
                      <span className={`${styles["p-a-t"]} flex items-center`}>
                        <span className={`${styles["p-a-type"]}`}>User Type: </span>
                        <h3 className={`${styles["top-greet"]} mb-0`}>All User</h3>
                      </span>
                    </div>
                  </div>

                  <span className={`${styles["p-a-t"]} flex items-center`}>
                    <span className={`${styles["p-a-type"]}`}>Status: </span>
                    <div className="form-check form-switch">
                      <AntSwitch checked={status === 1} onChange={handleToggle} disabled={isLoading} />
                    </div>
                  </span>

                 
                  {isLoading && <p className="text-blue-500">Updating...</p>}
                  {error && <p className="text-red-500">Failed to update. Try again.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Of2;
