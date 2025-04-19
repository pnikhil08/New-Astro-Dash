"use client";

import ButtonTileList from "@/app/UI/features/buttonui/ButtonTileList";
import CardBox from "@/app/UI/features/CardBox/CardBox";
// import FeedbackBoost from "@/app/UI/features/FeedbackBoost/FeedbackBoost";
import HomeMainCards from "@/app/UI/features/HomeCard/HomeMainCards";
import ManageServices from "@/app/UI/features/ManageServices/ManageServices";
import styles from '@/app/components/firstPage/firstpage.module.css'
import SupportChat from "@/app/UI/supportAPi/support";



export default function Firstpage() {


 
  return (
    <>
      <div className="">
        <HomeMainCards/>

        <CardBox />

        <ManageServices />

        <hr className="my-2" />

        <ButtonTileList />

        <hr className="my-2" />

        <SupportChat/>
        {/* <FeedbackBoost /> */}
        {/* <div className="relative">
  
        </div> */}
       
      </div>
    </>
  );
}




