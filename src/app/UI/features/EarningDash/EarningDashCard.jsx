import styles from '@/app/UI/features/EarningDash/earningDash.module.css'

const EarningDashCard = () => {
    return (
      <div className={`${styles["dash-earn-box"]} py-5`}>
      <div className={`${styles["e-card"]} ${styles["playing"]} md:pr-[5rem] flex items-center justify-center`}>
        <div className={`${styles["wave"]} `}></div>
        <div className={`${styles["wave"]} `}></div>
        <div className={`${styles["wave"]} `}></div>
        <div className={`${styles["infotop"]} `}>
          <span className={`${styles["total-earn"]} flex items-center justify-between`}>
            Life Time Earnings : <span className={`${styles["tot-amt"]} `}>₹ 50826.60</span>
          </span>
          <button className={`${styles["earn-button"]}  bg-warning`}>
            Show Wallet History
          </button>
        </div>
      </div>

      <div className={`${styles["earn-cards-bx"]}   grid grid-cols-2 md:flex  items-center justify-between md:flex-wrap`}>
        <div className={`${styles["earn-card"]}   flex items-center justify-between`}>
          <span className={`${styles["sp-ic-amt"]}  flex items-start flex-col justify-between`}>
            {/* <i className="fa-solid fa-comments"></i> */}
            <h2 className={`${styles["top-greet-h3"]}  mb-0`}>Chat</h2>
          </span>
          <span className={`${styles["earn-amt"]} `}>₹ 42</span>
        </div>
        <div className={`${styles["earn-card"]}  flex items-center justify-between`}>
          <span className={`${styles["sp-ic-amt"]}  flex items-start flex-col justify-between`}>
            {/* <i className="fa-solid fa-phone-volume"></i> */}
            <h2 className={`${styles["top-greet-h3"]}  mb-0`}>Call</h2>
          </span>
          <span className={`${styles["earn-amt"]} `}>₹ 42</span>
        </div>
        <div className={`${styles["earn-card"]}  flex items-center justify-between`}>
          <span className={`${styles["sp-ic-amt"]}  flex items-start flex-col justify-between`}>
            {/* <i className="fa-solid fa-cart-arrow-down"></i> */}
            <h2 className={`${styles["top-greet-h3"]} mb-0`}>Dhwani Shop</h2>
          </span>
          <span className={`${styles["earn-amt"]} `}>₹ 42</span>
        </div>
        <div className={`${styles["earn-card"]}  flex items-center justify-between`}>
          <span className={`${styles["sp-ic-amt"]}  flex items-start flex-col justify-between`}>
            <i className="fa-brands fa-google-play"></i>
            <h2 className={`${styles["top-greet-h3"]}  mb-0`}>Live Event</h2>
          </span>
          <span className={`${styles["earn-amt"]}`}>₹ 42</span>
        </div>
      </div>
    </div>
    );
  };
  
  export default EarningDashCard;
  