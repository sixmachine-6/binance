import axios from "axios";
import { getAuth } from "firebase/auth";

export async function fetchNotifications() {
  const user = getAuth().currentUser;
  console.log(user);
  if (!user) throw new Error("User not logged in");
  const firebaseToken = await user.getIdToken();
  const res = await axios.post(
    "http://127.0.0.1:5000/api/v1/notifications/get",
    { firebaseToken },
  );
  console.log(res);
  return res.data;
}
