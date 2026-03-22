import axios from "axios";
import { getAuth } from "firebase/auth";

export async function getPortfolio() {
  const user = getAuth().currentUser;

  if (!user) throw new Error("User not logged in");

  const firebaseToken = await user.getIdToken();

  const res = await axios.post(
    "http://127.0.0.1:5000/api/v1/trades/portfolio",
    { firebaseToken },
  );
  console.log(res);
  return res.data;
}
