import { NavLink } from "react-router-dom";
import { LayoutDashboard, Star, Wallet } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-950 text-white flex flex-col border-r border-gray-800">

      {/* Logo */}
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        CryptoSim
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">

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

      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-800 text-sm text-gray-500">
        Dummy Trading Platform
      </div>

    </div>
  );
}