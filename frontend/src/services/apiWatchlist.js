import axios from "axios";
import { getAuth } from "firebase/auth";

const BASE = "https://crypto-3wn4.onrender.com/api/v1/watchlist";

async function getToken() {
  const user = getAuth().currentUser;
  return await user.getIdToken();
}

export async function getWatchlist() {
  const firebaseToken = await getToken();

  const res = await axios.post(`${BASE}/get`, {
    firebaseToken,
  });

  return res.data;
}

export async function addWatchlist(symbol) {
  const firebaseToken = await getToken();

  const res = await axios.post(`${BASE}/add`, {
    firebaseToken,
    symbol,
  });

  return res.data;
}

export async function removeWatchlist(symbol) {
  const firebaseToken = await getToken();

  const res = await axios.post(`${BASE}/remove`, {
    firebaseToken,
    symbol,
  });

  return res.data;
}
