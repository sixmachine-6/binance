import { NavLink } from "react-router-dom";
import { LayoutDashboard, Star, Wallet, Bell } from "lucide-react";
import { useNotifications } from "../hooks/useNotification";

export default function Sidebar() {
  const { count } = useNotifications();

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        CryptoSim
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Star size={20} />
          Watchlist
        </NavLink>

        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Wallet size={20} />
          Portfolio
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Wallet size={20} />
          Reports
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition relative ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Bell size={20} />
          Notifications
          {count > 0 && (
            <span className="absolute right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-800 text-sm text-gray-500">
        Dummy Trading Platform
      </div>
    </div>
  );
}
