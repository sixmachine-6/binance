import axios from "axios";
import { getAuth } from "firebase/auth";

export async function executeTrade(data) {
  const user = getAuth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const firebaseToken = await user.getIdToken();
  console.log(data);
  const res = await axios.post("http://127.0.0.1:5000/api/v1/trades/execute", {
    firebaseToken,
    ...data,
  });

  return res.data;
}
