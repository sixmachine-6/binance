import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignup } from "../hooks/useSignup";

import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import TestOtpInfo from "../ui/TestotpInfo";

function Signup() {
  const navigate = useNavigate();
  const { mutate } = useSignup();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isPhoneValid = phoneRegex.test(phone);
  const isEmailValid = emailRegex.test(email);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("_grecaptcha");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // Cleanup recaptcha
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // SEND OTP
  const sendOtp = async () => {
    if (!isChecked) return toast.error("Accept Terms & Conditions first");
    if (!isEmailValid) return toast.error("Enter valid email");
    if (!isPhoneValid) return toast.error("Enter valid phone number");

    setLoading(true);

    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" },
      );

      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier,
      );

      setConfirmationResult(result);

      toast.success("OTP Sent 📲");
    } catch (err) {
      console.error(err);

      if (err.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Try later.");
      } else {
        toast.error(err.message || "Failed to send OTP");
      }
    }

    setLoading(false);
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    if (!confirmationResult) {
      toast.error("Send OTP first");
      return;
    }

    if (!otp || otp.length < 6) {
      toast.error("Enter 6 digit OTP");
      return;
    }

    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);

      const user = result.user;
      const firebaseToken = await user.getIdToken();

      mutate(
        { firebaseToken, email },
        {
          onSuccess: () => {
            toast.success("Account Created 🚀");
            navigate("/dashboard");
          },

          onError: (error) => {
            toast.error(error?.response?.data?.message || "Signup failed");
          },
        },
      );
    } catch (err) {
      toast.error("Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-extrabold mb-10 tracking-wide">
          Create Trading Account
        </h1>

        <div className="w-full max-w-xl bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 space-y-6">
          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled={confirmationResult || loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Phone Number</label>

            <div className="flex gap-2">
              <span className="bg-slate-700 p-4 rounded-xl border border-slate-600">
                +91
              </span>

              <input
                type="text"
                placeholder="Enter 10 digits"
                value={phone}
                disabled={confirmationResult || loading}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </div>

          {/* OTP */}
          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-green-400 outline-none"
              />

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full py-4 text-lg rounded-2xl font-bold bg-green-500 hover:bg-green-400 transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* TERMS + SEND OTP */}
          {!confirmationResult && (
            <>
              <div className="flex gap-3 items-center text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="accent-yellow-400 w-5 h-5"
                />

                <p>
                  I agree to{" "}
                  <span className="text-yellow-400 underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </p>
              </div>

              <button
                onClick={sendOtp}
                disabled={
                  !isChecked || !isPhoneValid || !isEmailValid || loading
                }
                className={`w-full py-4 text-lg rounded-2xl font-bold transition
                ${
                  isChecked && isPhoneValid && isEmailValid && !loading
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          <div id="recaptcha-container"></div>
        </div>

        <div className="mt-8 text-lg">
          <Link
            to="/login"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
        <TestOtpInfo />
      </div>
    </>
  );
}

export default Signup;
