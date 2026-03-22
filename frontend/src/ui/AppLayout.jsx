<<<<<<< HEAD
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
=======
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "./Sidebar";
// import AIWidget from "../features/ai/AiWidget";

// export default function AppLayout() {
//   return (
//     <div className="h-screen grid grid-rows-[100px_1fr]">
//       {/* Navbar */}

//       <Navbar />

//       {/* Main Body */}
//       <div className="grid grid-cols-[300px_1fr]">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Page Content */}
//         <main className="h-screen overflow-y-auto bg-gray-100">
//           <Outlet />
//         </main>
//         <AIWidget/>
//       </div>
//     </div>
//   );
// }
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import AIWidget from "../features/ai/AiWidget";
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

export default function AppLayout() {
  return (
    <div className="h-screen grid grid-rows-[100px_1fr]">
      {/* Navbar */}
<<<<<<< HEAD

      <Navbar />

      {/* Main Body */}
      <div className="grid grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className=" overflow-y-auto bg-gray-100">
          <Outlet />
=======
      <Navbar />

      {/* Main Body */}
      <div className="grid grid-cols-[300px_1fr] relative">
        {/* Sidebar */}
        <Sidebar />
        <AIWidget />
        {/* Page Content */}
        <main className="h-screen overflow-y-auto bg-gray-100 relative">
          <Outlet />

          {/* AI Widget button & panel inside main so it's aligned with content */}
          
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        </main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
