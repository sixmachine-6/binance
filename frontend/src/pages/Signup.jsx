import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignup } from "../hooks/useSignup";

// Ensure this matches your firebase.js export
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignup();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^[0-9]{10}$/;
  const isPhoneValid = phoneRegex.test(phone);

  // --- CLEANUP ON UNMOUNT ---
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // --- SEND OTP ---
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!isChecked) return toast.error("Accept Terms & Conditions first");

    setLoading(true);

    try {
      // 1. FIX: Clear any existing reCAPTCHA instance to avoid "already rendered" error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      // 2. Initialize (Auth MUST be the 1st argument)
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        },
      );

      const appVerifier = window.recaptchaVerifier;
      const formatPhone = `+91${phone}`;

      // 3. Request SMS
      const result = await signInWithPhoneNumber(
        auth,
        formatPhone,
        appVerifier,
      );

      setConfirmationResult(result);
      toast.success("OTP Sent! Check your phone 📲");
    } catch (err) {
      console.error("SMS Error:", err);

      // Handle Firebase-specific error codes
      if (err.code === "auth/billing-not-enabled") {
        toast.error(
          "Daily limit reached or Billing not enabled. Use a TEST NUMBER.",
        );
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error(err.message || "Failed to send OTP");
      }

      // Reset Recaptcha so the button works on the next click
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // --- VERIFY OTP ---
  const verifyOtp = async () => {
    if (!otp || otp.length < 6) return toast.error("Enter 6-digit OTP");

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      const firebaseToken = await user.getIdToken();

      mutate(
        { firebaseToken },
        {
          onSuccess: () => {
            toast.success("Account Created 🚀");
            navigate("/dashboard");
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message || "Backend Sync Failed",
            );
          },
        },
      );
    } catch (err) {
      console.error("Verification Error:", err);
      toast.error("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-extrabold mb-10 tracking-wide">
          Create Trading Account
        </h1>

        <div className="w-full max-w-xl bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 space-y-6">
          {/* PHONE INPUT */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Phone Number</label>
            <div className="flex gap-2">
              <span className="bg-slate-700 p-4 rounded-xl border border-slate-600">
                +91
              </span>
              <input
                type="text"
                disabled={confirmationResult || loading}
                placeholder="Enter 10 digits"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-yellow-400 outline-none transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* OTP INPUT (Conditional) */}
          {confirmationResult && (
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading}
                className="w-full py-4 text-lg rounded-2xl font-bold bg-green-500 hover:bg-green-400 transition disabled:bg-gray-600"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* TERMS & SEND BUTTON */}
          {!confirmationResult && (
            <>
              <div className="flex gap-3 items-center text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="accent-yellow-400 w-5 h-5 cursor-pointer"
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
                disabled={!isChecked || !isPhoneValid || loading}
                className={`w-full py-4 text-lg rounded-2xl font-bold transition-all
                ${
                  isChecked && isPhoneValid && !loading
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-gray-600 cursor-not-allowed text-gray-300"
                }`}
              >
                {loading ? "Please wait..." : "Send OTP"}
              </button>
            </>
          )}

          {/* RECAPTCHA CONTAINER */}
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
      </div>
    </>
  );
};

export default Signup;
