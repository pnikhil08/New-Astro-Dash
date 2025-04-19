"use client";
import { useRouter } from "next/navigation"; 
import styles from "@/app/UI/features/HomeCard/homemaincard.module.css";
import {
  useGetdosAndDontApiQuery,
  useGetNoticeBoardQuery,
} from "@/app/redux/slice/doesDont";

const HomeMainCards = () => {
  const router = useRouter();
  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
  
  
  

  const {
    data: noticeData,
    isLoading: isNoticeLoading,
    error: noticeError,
  } = useGetNoticeBoardQuery();
  const {
    data: dosDontData,
    isLoading: isDosDontLoading,
    error: dosDontError,
  } = useGetdosAndDontApiQuery();

  const cards = [
    {
      title: "Notice Board",
      content: (
        <>
          {isNoticeLoading ? (
            <p>Loading...</p>
          ) : noticeError ? (
            <p className="text-red-500">Failed to load notice board data.</p>
          ) : (
            <div className="space-y-2">
            
              {noticeData?.data?.data?.filter((notice) => isToday(notice.created_at)).length > 0 ? (
                noticeData?.data?.data
                  ?.filter((notice) => isToday(notice.created_at))
                  ?.slice(0, 1)
                  ?.map((notice) => (
                    <div key={notice.id} className="">
                      <h4 className="font-semibold">{notice.heading}</h4>
                      <p className="text-sm">{notice.text}</p>
                      <small className="text-gray-500 text-xs">
                        {formatDateTime(notice.created_at)}
                      </small>
                    </div>
                  ))
              ) : (
             
                [...noticeData?.data?.data]
                ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
                  ?.slice(0, 3)
                  ?.map((notice) => (
                    <div key={notice.id} className="">
                      <div className="flex justify-between">
                      <h4 className="font-semibold text-sm">{notice.heading}</h4>
                      <small className=" text-xs">
                        {formatDateTime(notice.created_at)}
                      </small>
                      </div>
                      <p className="text-sm">{notice.text}</p>
                      
                    </div>
                  ))
              )}
              <b className="block pt-2 text-center text-gray-700">Dhwani Astro</b>
            </div>
          )}
        </>
      ),
      button: {
        label: "View All",
        onClick: () => router.push("dashboard/noticeBoard"),
        buttonClass: "bg-green-500 bg-opacity-50",
      },
      cardClass: "bg-green-500 bg-opacity-25",
    }
    ,
    
    {
      title: `Do's and Don't`,
      content: (
        <>
          {isDosDontLoading ? (
            <p>Loading...</p>
          ) : dosDontError ? (
            <p className="text-red-500">Failed to load content.</p>
          ) : (
            <div className="text-xs">
              <div
                dangerouslySetInnerHTML={{
                  __html: `${dosDontData?.dos?.slice(0, 200)}...`,
                }}
              />
            <b className="block pt-2 text-center text-gray-700">Dhwani Astro</b>
            </div>
          )}
        </>
      ),
      button: {
        label: "View All",
        onClick: () => router.push("dashboard/dosDonts"),
 
        buttonClass: "bg-green-500 bg-opacity-50",
      },
      cardClass: "bg-blue-500 bg-opacity-25",
    },
   

  ];

  return (
    <div
      className={`${styles.homeMainCards} flex items-center justify-between flex-wrap`}
    >
      {cards.map((card, index) => (
        <div key={index} className={`${card.cardClass} ${styles.cardMain}`}>
          <span className={styles.cardSp}>{card.title}</span>

          {card.content && (
            <>
              <div className={`${styles.cardP} mb-0`}>{card.content}</div>
              {card.button && (
                <div
                  className={`${styles.aBtnVw} flex items-center justify-center`}
                >
                  <button
                    onClick={card.button.onClick}
                    className={`${card.button.buttonClass} px-4 rounded text-white`}
                  >
                    {card.button.label}
                  </button>
                 
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeMainCards;
