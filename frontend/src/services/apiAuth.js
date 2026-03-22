import axios from "axios";

export async function signupAccount(data) {
  const res = await axios.post(
    "http://127.0.0.1:5000/api/v1/users/signup",
    data,
  );

  return res.data;
}

<<<<<<< HEAD
export async function loginAccount({ phone }) {
  // 1. Strictly 10-digit phone validation
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error("Please enter a valid 10-digit phone number");
  }

  // 2. Call your REAL backend API
  // Replace this URL with your actual Node.js endpoint
  const response = await fetch("http://localhost:5000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  const data = await response.json();

  if (!response.ok) {
    // This allows the '404' to reach your 'onError' in the component
    const error = new Error(data.message || "Login failed");
    error.status = response.status;
    throw error;
  }

  return data;
=======
export async function loginAccount(data) {
  if (!data.firebaseToken) {
    throw new Error("Firebase token missing");
  }

  const res = await axios.post(
    "http://127.0.0.1:5000/api/v1/users/login",
    data,
  );
  console.log(res);
  return res.data;
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
}
