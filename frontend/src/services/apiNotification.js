import axios from "axios";
import { getAuth } from "firebase/auth";
const API = " ";
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

export const markNotificationRead = async (id) => {
  const res = await axios.patch(`${API}/read/${id}`);
  return res.data;
};

export const fetchUnreadCount = async () => {
  const res = await axios.get(`${API}/unread-count`);
  return res.data?.count ?? 0;
};
