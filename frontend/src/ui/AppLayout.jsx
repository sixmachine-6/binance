import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="h-screen grid grid-rows-[100px_1fr]">
      {/* Navbar */}

      <Navbar />

      {/* Main Body */}
      <div className="grid grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="h-screen overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
