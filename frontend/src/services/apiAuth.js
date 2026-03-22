import axios from "axios";

export async function signupAccount(data) {
  const res = await axios.post(
    "http://127.0.0.1:5000/api/v1/users/signup",
    data,
  );
  console.log(res);
  return res.data;
}

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
}
