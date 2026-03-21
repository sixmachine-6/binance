import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="h-screen grid grid-rows-[60px_1fr]">
      {/* Navbar */}
      <header className="bg-gray-800 text-white flex items-center px-6">
        <Navbar />
      </header>

      {/* Main Body */}
      <div className="grid grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
