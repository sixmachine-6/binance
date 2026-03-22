import { useState, useEffect } from "react";
import { useNotifications } from "../hooks/useNotification";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function Notifications() {
  const { notifications, markRead, isLoading } = useNotifications();

  const [email, setEmail] = useState("");
  const [hasEmail, setHasEmail] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) return;

        const firebaseToken = await user.getIdToken();
        console.log(firebaseToken);

        const res = await axios.post(
          "http://127.0.0.1:5000/api/v1/users/getMe",
          { firebaseToken },
        );

        console.log(res);

        if (res.data.email) {
          setHasEmail(true);
        } else {
          setHasEmail(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkEmail();
  }, []);

  const saveEmail = async () => {
    if (!email) return;

    try {
      setSaving(true);

      const user = getAuth().currentUser;
      const firebaseToken = await user.getIdToken();

      await axios.post("http://127.0.0.1:5000/api/v1/users/add-email", {
        firebaseToken,
        email,
      });

      setHasEmail(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (hasEmail === null) {
    return <div className="p-6">Loading...</div>;
  }

  // Ask email if not stored
  if (!hasEmail) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-4">
        <h1 className="text-xl font-bold">Enter Email for Notifications</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={saveEmail}
          disabled={saving}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Saving..." : "Save Email"}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">Loading notifications...</div>;
  }

  // ensure notifications is always an array
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <div className="flex flex-col gap-3">
        {safeNotifications.length === 0 && (
          <div className="text-gray-500">No notifications yet</div>
        )}

        {safeNotifications.map((n) => (
          <div
            key={n._id}
            className={`p-4 border rounded-lg flex justify-between items-center
            ${n.isRead ? "bg-gray-100" : "bg-white"}`}
          >
            <div>
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>

            {!n.isRead && (
              <button
                onClick={() => markRead(n._id)}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
