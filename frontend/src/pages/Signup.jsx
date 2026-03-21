import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [data, setData] = useState({
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === "password") {
      const strongRegex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

      if (strongRegex.test(value)) {
        setPasswordStrength("Strong");
      } else if (value.length >= 6) {
        setPasswordStrength("Medium");
      } else {
        setPasswordStrength("Weak");
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
      setEmailValid(emailRegex.test(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailValid) {
      alert("Enter valid email");
      return;
    }

    if (!isChecked) {
      alert("Accept Terms & Conditions first");
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (data.mobileNumber.length !== 10) {
      alert("Invalid mobile number");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
      (user) => user.email === data.email
    );

    if (userExists) {
      alert("User already exists");
      return;
    }

    const { confirmPassword, ...dataToStore } = data;

    users.push(dataToStore);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created Successfully 🚀");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen py-12 bg-slate-900 text-white flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-yellow-400">
          Create Trading Account
        </h1>

        <form className="space-y-5 w-full max-w-lg px-6 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">

          {/* MOBILE */}
          <input
            name="mobileNumber"
            placeholder="Mobile Number"
            value={data.mobileNumber}
            onChange={handleChange}
            required
            className={`input-style ${
              data.mobileNumber && data.mobileNumber.length !== 10
                ? "error"
                : ""
            }`}
          />

          {data.mobileNumber && data.mobileNumber.length !== 10 && (
            <p className="text-red-400 text-sm">
              Mobile must be 10 digits
            </p>
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
            className={`input-style ${
              data.email
                ? emailValid
                  ? "success"
                  : "error"
                : ""
            }`}
          />

          {data.email && (
            <p
              className={`text-sm ${
                emailValid ? "text-green-400" : "text-red-400"
              }`}
            >
              {emailValid
                ? "Valid Email Format ✅"
                : "Invalid Email Format ❌"}
            </p>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            className="input-style"
          />

          {/* PASSWORD STRENGTH */}
          {data.password && (
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-28 rounded-full
                ${
                  passwordStrength === "Strong"
                    ? "bg-green-400"
                    : passwordStrength === "Medium"
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
              ></div>

              <p
                className={`text-sm font-semibold
                ${
                  passwordStrength === "Strong"
                    ? "text-green-400"
                    : passwordStrength === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {passwordStrength}
              </p>
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handleChange}
            required
            className={`input-style ${
              data.confirmPassword &&
              data.password !== data.confirmPassword
                ? "error"
                : ""
            }`}
          />

          {data.confirmPassword &&
            data.password !== data.confirmPassword && (
              <p className="text-red-400 text-sm">
                Passwords do not match
              </p>
            )}

          {/* TERMS */}
          <div className="flex gap-2 text-gray-300 text-sm items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="accent-yellow-400 w-4 h-4"
            />
            <p>
              I agree to{" "}
              <span className="text-yellow-400 cursor-pointer hover:underline">
                Terms & Conditions
              </span>
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full py-3 rounded-2xl font-bold transition-all duration-300
            ${
              isChecked
                ? "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-105 active:scale-95"
                : "bg-gray-600 cursor-not-allowed text-gray-300"
            }`}
            disabled={!isChecked}
          >
            Create Account
          </button>
        </form>

        <div className="mt-6">
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