import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaQrcode, FaWindows } from "react-icons/fa";

const Leftsection = () => {
    return (
        <div className="flex flex-col justify-center text-white max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 leading-tight">
                312,263,085
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                USERS
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                TRUST US
            </h2>
            <div className="flex items-center gap-10 mt-8">
                <div className="flex flex-col items-center text-center">
                    <p className="text-yellow-400 font-semibold">No.1</p>
                    <p className="text-gray-400 text-sm">Customer Assets</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <p className="text-yellow-400 font-semibold">No.1</p>
                    <p className="text-gray-400 text-sm">Trading Volume</p>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
                <div className="flex items-center bg-slate-800 rounded-md px-3 w-64">
                    <input
                        type="text"
                        placeholder="Email/Phone number"
                        className="bg-transparent px-2 py-3 outline-none text-white w-full"/>
                </div>
                <button className="px-6 py-3 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-500 transition">
                    Sign Up
                </button>
            </div>
            <div className="flex items-center gap-4 mt-6">
                <button className="bg-slate-800 p-3 rounded-md hover:bg-slate-700 transition">
                    <FcGoogle className="w-5 h-5" />
                </button>
                <button className="bg-slate-800 p-3 rounded-md hover:bg-slate-700 transition">
                    <FaApple className="w-5 h-5 text-white" />
                </button>
                <button className="bg-slate-800 p-3 rounded-md hover:bg-slate-700 transition">
                    <FaQrcode className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
};

export default Leftsection;