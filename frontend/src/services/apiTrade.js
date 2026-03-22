import axios from "axios";
import { getAuth } from "firebase/auth";

export async function executeTrade(data) {
  const user = getAuth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const firebaseToken = await user.getIdToken();
  console.log(data);
  const res = await axios.post(
    "https://crypto-3wn4.onrender.com/api/v1/trades/execute",
    {
      firebaseToken,
      ...data,
    },
  );

  return res.data;
}
