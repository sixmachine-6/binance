import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("_grecaptcha");

  const handleLogout = () => {
    localStorage.removeItem("_grecaptcha");
    navigate("/login");
  };

  return (
    <div className="bg-[#1c242f] flex justify-between items-center h-28 px-6 relative z-50">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <span className="w-36">
          <img
            src="https://www.logo.wine/a/logo/Binance/Binance-Horizontal2-Dark-Background-Logo.wine.svg"
            alt="logo"
            className="w-full object-contain"
          />
        </span>

        <ul className="flex items-center gap-6 text-white text-lg font-semibold cursor-pointer">
          <li>
            <NavLink
              to="/market"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
              }
            >
              Markets
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {!user ? (
          <>
            {/* Login */}
            <Link to="/login">
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">
                Log In
              </button>
            </Link>

            {/* Signup */}
            <Link to="/signup">
              <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          /* User Icon */
          <div className="flex items-center gap-3">
            <User
              className="w-7 h-7 text-white cursor-pointer hover:text-yellow-400"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
