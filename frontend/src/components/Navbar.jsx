import React from "react";
import { Search, Download, Globe, Moon, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-900 flex flex-row justify-between">
      <div className="flex flex-row justify-evenly px-2 items-center gap-2">
        <span className="w-28 h-xs">
          <img
            src="https://www.logo.wine/a/logo/Binance/Binance-Horizontal2-Dark-Background-Logo.wine.svg"
            alt="logo"
            className="w-full object-cover"
          />
        </span>
        <ul className="list-none text-white text-md flex flex-row justify-evenly font-semibold gap-6 cursor-pointer">
          <li>Buy Crypto</li>
          <li>Markets</li>
          <Link to="/trade/:symbol"><li className="flex flex-row">
            Trade <ChevronDown />
          </li></Link>
          <li className="flex flex-row">
            Futures <ChevronDown />
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4 px-2">
        <Search className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
        <button className="px-3 py-1 cursor-pointer border-slate-900 rounded-lg bg-slate-700 text-white">
          Log In
        </button>
        <button className="px-4 py-1 cursor-pointer bg-yellow-400 text-black rounded">
          {" "}
          Sign Up
        </button>
        <Download className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
        <Globe className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
        <Moon className="w-5 h-5 cursor-pointer text-white hover:text-yellow-400" />
      </div>
    </div>
  );
};

export default Navbar;
