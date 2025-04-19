// "use client";
// import styles from '@/app/UI/features/Walletcard/walleteCarsd.module.css'
// // import { IoIosArrowDropdown } from "react-icons/io";
// import  { useState } from "react";
// import { useWalletApiQuery } from '@/app/redux/slice/walletSlice';
// import BasicPagination from "../../PaginationUI/Pagination";
// import useFilteredSearch from "@/hooks/useFilteredSearch";

// const TransactionTable = () => {
//   const [page, setPage] = useState(1);
//   const { data, isLoading, error, isFetching } = useWalletApiQuery(page);

//   const pagination = data?.pagination || {};
//   const recordList = Array.isArray(data?.recordList) ? data.recordList : [];

//   const availableBalanceRaw = recordList[0]?.balance_amount || "0";
//   const availableBalanceNum = Number(availableBalanceRaw.replace(/,/g, "")) || 0;

//   const pgCharge = (availableBalanceNum * 2.5) / 100;
//   const subTotal = availableBalanceNum - pgCharge;
//   const tds = (subTotal * 10) / 100;
//   const payableAmount = subTotal - tds;

//   const filteredData = useFilteredSearch(recordList, [
//     "transaction_id",
//     "product_type",
//     "amount",
//     "formatted_created_at",
//   ]);

//   if (isLoading) return <p>Loading records...</p>;
//   if (error) return <p>Error loading records. Please try again.</p>;
//   if (!filteredData || filteredData.length === 0) {
//     return <p>No records found.</p>;
//   }
//   return (
//     <div className={`${styles["dash-wallet-cont"]} flex items-center flex-col `}>
//       <h2 className={`${styles["wallet-head"]} text-center`}>Wallet Transactions</h2>
//       <div className={`${styles["wallet-list"]} flex flex-col pt-2 p-1 md:p-2`}>
//         <div className={`${styles["wallet-top-line"]} bg-violet-500 rounded-md  items-center justify-between flex`}>
//           <ul className={`${styles["wallet-ul"]} w-[19rem] sm:w-[30rem] xl:w-[50rem] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 px-2 pb-2 mb-0 gap-[.5rem] md:gap-[1rem] mt-2`}>
//           <li>
//     <a href="#" className={`${styles["dash-f-li"]} text-[.55rem] md:text-xs xl:text-sm`}>
//       Available Balance : <span> ₹ {availableBalanceNum.toFixed(2)}</span>
//     </a>
//   </li>
//   <li>
//     <a href="#" className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>
//       PG Charge : <span>₹ {pgCharge.toFixed(2)}</span>
//     </a>
//   </li>
//   <li>
//     <a href="#" className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>
//       Sub Total : <span>₹ {subTotal.toFixed(2)}</span>
//     </a>
//   </li>
//   <li>
//     <a href="#" className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>
//       TDS : <span>₹ {tds.toFixed(2)}</span>
//     </a>
//   </li>
//   <li>
//     <a href="#" className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>
//       GST : <span>N/A</span>
//     </a>
//   </li>
//   <li>
//     <a href="#" className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>
//       Payable Amount : <span>₹ {payableAmount.toFixed(2)}</span>
//     </a>
//   </li>
//           </ul>

//         </div>
//       </div>

//       <div className="md:p-6 bg-gray-200 rounded-xl w-full mt-4">
//         <div className="overflow-x-auto">
//           <table className="w-[100%] border-collapse bg-white shadow-md rounded-xl">
//             <thead>
//               <tr className="bg-gray-100 text-left text-gray-700 uppercase text-[.45rem] md:text-xs xl:text-sm">
//                 <th className="px-2 py-3 text-center">ID</th>
                
//                 <th className="px-0 py-3 text-center">Category</th>
//                 <th className="px-0 py-3 text-center">Transaction Amount</th>
//                 <th className="px-0 py-3 text-center">Date Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((transaction) => (
//                 <tr key={transaction.id} className="border-t text-[0.45rem] md:text-sm text-gray-700">
//                   <td className="px-2 py-3 text-center font-semibold">{transaction.transaction_id}</td>
//                   {/* <td className="px-0 py-3">{transaction.description}</td> */}
//                   <td className="px-0 py-3 text-center">{transaction.product_type}</td>
//                   <td className="px-0 py-3 text-center">₹ {transaction.amount}</td>
//                   <td className="px-0 py-3 text-center">{new Date(transaction.formatted_created_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <BasicPagination
//         currentPage={pagination?.current_page || 1}
//         totalPages={pagination?.last_page || 1}
//         onPageChange={(newPage) => setPage(newPage)}
//       />
//       {isFetching && (
//         <div className="mt-2 text-sm text-gray-500">Loading data...</div>
//       )}
//     </div>
//   );
// }; {/* <span className="absolute right-24 mt-3 transform -translate-y-1/2 pointer-events-none">
//   <IoIosArrowDropdown />
// </span> */}

// export default TransactionTable;


"use client";

import styles from '@/app/UI/features/Walletcard/walleteCarsd.module.css';
import { useState, useEffect, useMemo } from "react";
import { useWalletApiQuery } from '@/app/redux/slice/walletSlice';
import BasicPagination from "../../PaginationUI/Pagination";
import useFilteredSearch from "@/hooks/useFilteredSearch";

const TransactionTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useWalletApiQuery(page);

  const pagination = data?.pagination || {};

  // ✅ Memoize derived values
  const recordList = useMemo(() => {
    return Array.isArray(data?.recordList) ? data.recordList : [];
  }, [data]);

  const filteredData = useFilteredSearch(recordList, [
    "transaction_id",
    "product_type",
    "amount",
    "formatted_created_at",
  ]);

  const calculatedValues = useMemo(() => {
    if (recordList.length === 0) return {
      availableBalanceNum: 0,
      pgCharge: 0,
      subTotal: 0,
      tds: 0,
      payableAmount: 0,
    };

    const availableBalanceRaw = recordList[0]?.balance_amount || "0";
    const availableBalanceNum = Number(availableBalanceRaw.replace(/,/g, "")) || 0;
    const pgCharge = (availableBalanceNum * 2.5) / 100;
    const subTotal = availableBalanceNum - pgCharge;
    const tds = (subTotal * 10) / 100;
    const payableAmount = subTotal - tds;

    return { availableBalanceNum, pgCharge, subTotal, tds, payableAmount };
  }, [recordList]);

  const formattedDates = useMemo(() => {
    return filteredData.map(txn =>
      new Date(txn.formatted_created_at).toLocaleString()
    );
  }, [filteredData]);

  if (isLoading) return <p>Loading records...</p>;
  if (error) return <p>Error loading records. Please try again.</p>;
  if (!filteredData || filteredData.length === 0) return <p>No records found.</p>;

  return (
    <div className={`${styles["dash-wallet-cont"]} flex items-center flex-col`}>
      <h2 className={`${styles["wallet-head"]} text-center`}>Wallet Transactions</h2>

      <div className={`${styles["wallet-list"]} flex flex-col pt-2 p-1 md:p-2`}>
        <div className={`${styles["wallet-top-line"]} bg-violet-500 rounded-md flex items-center justify-between`}>
          <ul className={`${styles["wallet-ul"]} w-[19rem] sm:w-[30rem] xl:w-[50rem] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 px-2 pb-2 mb-0 gap-[.5rem] md:gap-[1rem] mt-2`}>
            <li><a className={`${styles["dash-f-li"]} text-[.55rem] md:text-xs xl:text-sm`}>Available Balance : <span>₹ {calculatedValues.availableBalanceNum.toFixed(2)}</span></a></li>
            <li><a className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>PG Charge : <span>₹ {calculatedValues.pgCharge.toFixed(2)}</span></a></li>
            <li><a className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>Sub Total : <span>₹ {calculatedValues.subTotal.toFixed(2)}</span></a></li>
            <li><a className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>TDS : <span>₹ {calculatedValues.tds.toFixed(2)}</span></a></li>
            <li><a className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>GST : <span>N/A</span></a></li>
            <li><a className={`${styles["dash-f-li"]} text-[.5rem] md:text-xs xl:text-sm`}>Payable Amount : <span>₹ {calculatedValues.payableAmount.toFixed(2)}</span></a></li>
          </ul>
        </div>
      </div>

      <div className="md:p-6 bg-gray-200 rounded-xl w-full mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 uppercase text-[.45rem] md:text-xs xl:text-sm">
                <th className="px-2 py-3 text-center">ID</th>
                <th className="px-0 py-3 text-center">Category</th>
                <th className="px-0 py-3 text-center">Transaction Amount</th>
                <th className="px-0 py-3 text-center">Date Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((transaction, index) => (
                <tr key={transaction.id} className="border-t text-[0.45rem] md:text-sm text-gray-700">
                  <td className="px-2 py-3 text-center font-semibold">{transaction.transaction_id}</td>
                  <td className="px-0 py-3 text-center">{transaction.product_type}</td>
                  <td className="px-0 py-3 text-center">₹ {transaction.amount}</td>
                  <td className="px-0 py-3 text-center">{formattedDates[index] || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BasicPagination
        currentPage={pagination?.current_page || 1}
        totalPages={pagination?.last_page || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {isFetching && (
        <div className="mt-2 text-sm text-gray-500">Loading data...</div>
      )}
    </div>
  );
};

export default TransactionTable;
