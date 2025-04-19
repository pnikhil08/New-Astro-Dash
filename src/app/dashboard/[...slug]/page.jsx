"use client";
import { useParams } from "next/navigation";

import Firstpage from "@/app/components/firstPage/FirstPage";
import CallHistoryCard from "@/app/UI/features/CallHistorycard/CallHistoryCard";
import ChatHistoryCard from "@/app/UI/features/ChatHistoryCard/ChatHistoryCard";
import EarningDashCard from "@/app/UI/features/EarningDash/EarningDashCard";
import LiveEvents from "@/app/UI/features/liveEvent/LiveEvent";
import Followers from "@/app/UI/features/MyFollowe/Follower";
import Review from "@/app/UI/features/myReview/Review";
import Offers from "@/app/UI/features/Offer/OfferPage";
import Remedy from "@/app/UI/features/Remedies/Remedies";

import StoreHistoryCard from "@/app/UI/features/StoreHistoryCard/StoreHistoryCard";

import TransactionTable from "@/app/UI/features/Walletcard/Wallet";

import Bankdetail from "@/app/UI/SettingUI/bankDetails/bankdetail";
import PriceRequestCard from "@/app/UI/SettingUI/priceRequest";

import SupportChat from "@/app/UI/supportAPi/support";

import Of2 from "@/app/UI/features/Offer/of2";
import NoticeBoardPage from "@/app/UI/HomeCards/NoticeBoard";
import DosAndDontsPage from "@/app/UI/HomeCards/DosAndDont";
import ChatNotes from "@/app/UI/NotesPages/ChatNotes";
import CallNotes from "@/app/UI/NotesPages/CallNotes";

export default function DashboardSection() {
  const params = useParams();
  const path = params.slug || [];

  console.log("Current slug path:", path);

  const sectionComponents = {
    firstpage: <Firstpage />,
    callhistory: <CallHistoryCard />,
    storehistory: <StoreHistoryCard />,
    chathistory: <ChatHistoryCard />,
    earningdash: <EarningDashCard />,
    wallet: <TransactionTable />,
    // offer: <Offers />,
    offer: <Of2/>,
    remedy: <Remedy />,

    myreview: <Review />,
    liveevent: <LiveEvents />,
    supportChat: <SupportChat />,
    myfollower: <Followers />,
  };

  const settingComponents = {
    bankdetails: <Bankdetail />,
    pricerequest: <PriceRequestCard />,
  };

  const homeCards = {
    noticeBoard: <NoticeBoardPage/>,
    dosDonts: <DosAndDontsPage/>
  }
  const notes = {
    chatNotes :  <ChatNotes/>,
    callNotes : <CallNotes/>
  }

  let ComponentToRender = null;

  if (path.length === 1) {
    ComponentToRender =
      sectionComponents[path[0]] ||
      homeCards[path[0]] ||
      settingComponents[path[0]];
  } else if (path.length === 2 && path[0] === "setting") {
    ComponentToRender = settingComponents[path[1]];
  } else if (path.length === 2 && path[0] === "dashboard") {
    ComponentToRender = homeCards[path[1]];
   
  }else if (path.length === 3 && path[0] === "chathistory" && path[1] === "chatNotes") {
    const orderId = path[2];
    ComponentToRender = <ChatNotes orderId={orderId} />;
}else if (path.length === 3 && path[0] === "callhistory" && path[1] === "callNotes") {
  const orderId = path[2];
  ComponentToRender = <CallNotes orderId={orderId} />;
}

  

  return (
    <>
      {ComponentToRender ? (
        ComponentToRender
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-red-600">Page Not Found</h1>
        </div>
      )}
    </>
  );
}
