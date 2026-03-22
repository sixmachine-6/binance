import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Download, Globe, Moon, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("_grecaptcha");

  const handleLogout = () => {
    localStorage.removeItem("_grecaptcha");
    navigate("/login");
  };

  return (
    <div className="bg-[#1c242f] flex justify-between items-center h-28 px-6">
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
          <li className="hover:text-yellow-400">Buy Crypto</li>
          <li className="hover:text-yellow-400">Markets</li>

         <Link to="/trade/:symbol"> <li className="flex items-center gap-1 hover:text-yellow-400">
            Trade <ChevronDown size={18} />
          </li></Link>

          <li className="flex items-center gap-1 hover:text-yellow-400">
            Futures <ChevronDown size={18} />
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <Search className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />

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

        <Download className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
        <Globe className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
        <Moon className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
      </div>
    </div>
  );
};

export default Navbar;
