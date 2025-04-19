// import Navbar from "../components/navbar/Navbar";
// import Sidebar from "../components/sidebar/Sidebar";
// // import Footer from "../components/Footer/Footer";
// import TopBar from "../components/navbar2/TopBar";
// import Footern from "../components/nfoooter/footer";
// import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
// import { SearchProvider } from "../../ContextAPi/SearchContext";

// export default function RootLayout({ children }) {
//   return (
//     <ProtectedRoute>
//       <SearchProvider>
//     <div className="w-[100%]">
//       <div >
//         <div className="">
//           <div className="">
//             <Navbar />
//           </div>

//           <div className="flex">
//             <div className="">
//               <Sidebar />
//             </div>

//             <div className=" ">
//               <div className="">
//                 <TopBar />
//               </div>
//               <main className="md:mx-7 md:me-[7rem]">{children}</main>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Footer /> */}
//       <Footern/>
//      </div>
//      </SearchProvider>
//     </ProtectedRoute>
//   );
// }

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import TopBar from "../components/navbar2/TopBar";
import Footern from "../components/nfoooter/footer";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import { SearchProvider } from "../../ContextAPi/SearchContext";

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <SearchProvider>
        <div className="w-full flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main content area: Sidebar + TopBar + Page */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Page */}
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="flex-1 md:mx-7 md:me-[7rem] ">{children}</main>
            </div>
          </div>

          {/* Footer */}
          <Footern />
        </div>
      </SearchProvider>
    </ProtectedRoute>
  );
}

// import Navbar from "../components/navbar/Navbar";
// import Sidebar from "../components/sidebar/Sidebar";
// import TopBar from "../components/navbar2/TopBar";
// import Footern from "../components/nfoooter/footer";
// import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
// import { SearchProvider } from "../../ContextAPi/SearchContext";

// export default function RootLayout({ children }) {
//   return (
//     <ProtectedRoute>
//       <SearchProvider>
//         <div className="w-full flex flex-col h-screen overflow-hidden">
//           {/* Navbar */}
//           <Navbar />

//           {/* Main content area: Sidebar + TopBar + Page */}
//           <div className="flex flex-1 overflow-hidden">
//             {/* Sidebar */}
//             <div className="w-[220px] h-full hidden md:block overflow-y-auto bg-[#2f1254] text-white">
//               <Sidebar />
//             </div>

//             {/* Main Page */}
//             <div className="flex-1 flex flex-col overflow-hidden">
//               <TopBar />
//               <main className="flex-1 md:mx-7 md:me-[7rem] overflow-y-auto">
//                 {children}
//               </main>
//             </div>
//           </div>

//           {/* Footer */}
//           <Footern />
//         </div>
//       </SearchProvider>
//     </ProtectedRoute>
//   );
// }
