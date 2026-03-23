import axios from "axios";

export async function signupAccount(data) {
  const res = await axios.post(
    "https://crypto-3wn4.onrender.com/api/v1/users/signup",
    data,
  );
  console.log(res);
  return res.data;
}

export async function loginAccount(data) {
  if (!data.firebaseToken) {
    throw new Error("Firebase token missing");
  }
  console.log(data);
  const res = await axios.post(
    "https://crypto-3wn4.onrender.com/api/v1/users/login",
    data,
  );
  console.log(res);
  return res.data;
}
