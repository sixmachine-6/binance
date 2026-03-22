import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogin } from "../hooks/useLogin";

import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^[0-9]{10}$/;
  const isPhoneValid = phoneRegex.test(phone);

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
    if (!isPhoneValid) {
      toast.error("Enter valid 10 digit phone number");
      return;
    }

    setLoading(true);

    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
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
      toast.error(err.message || "Failed to send OTP");
    }

    setLoading(false);
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      return toast.error("Enter 6 digit OTP");
    }

    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);

      const user = result.user;
      const firebaseToken = await user.getIdToken();

      mutate(
        { firebaseToken },
        {
          onSuccess: () => {
            toast.success("Login successful 🚀");
            navigate("/dashboard");
          },

          onError: (error) => {
            const message = error?.response?.data?.message || "Login failed";

            toast.error(message);

            // redirect if user not found
            if (error?.response?.status === 404) {
              navigate("/signup");
            }
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
          Verify Account
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
                placeholder="Enter 10 digits"
                value={phone}
                disabled={confirmationResult || loading}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full text-lg p-4 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </div>

          {/* SEND OTP */}
          {!confirmationResult && (
            <button
              onClick={sendOtp}
              disabled={!isPhoneValid || loading}
              className={`w-full py-4 text-lg rounded-2xl font-bold transition
              ${
                isPhoneValid && !loading
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-gray-600 cursor-not-allowed text-gray-300"
              }`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}

          {/* OTP INPUT */}
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

          <div id="recaptcha-container"></div>
        </div>

        {/* SIGNUP LINK */}
        <div className="mt-8 text-lg">
          <span className="text-gray-400">New here?</span>{" "}
          <Link
            to="/signup"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
