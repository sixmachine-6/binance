import { useNotifications } from "../hooks/useNotification";

export default function Notifications() {
  const { notifications, markRead, isLoading } = useNotifications();

  if (isLoading) {
    return <div className="p-6">Loading notifications...</div>;
  }

  // ensure notifications is always an array
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="p-6 space-y-4 bg-[#151d27] h-screen overflow-auto">
      <h1 className="text-2xl font-bold text-white">Notifications</h1>

      <div className="flex flex-col gap-3 text-xl">
        {safeNotifications.length === 0 && (
          <div className="text-gray-500">No notifications yet</div>
        )}

        {safeNotifications.map((n) => (
          <div
            key={n._id}
            className={`p-4 text-xl border rounded-lg flex justify-between items-center
            ${n.isRead ? "bg-green-200" : "bg-red-200"}`}
          >
            <div>
              <p>{n.message}</p>
              <p className="text-black">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>

            {!n.isRead && (
              <button
                onClick={() => markRead(n._id)}
                className="px-3 py-1 text-xl bg-red-500 text-white rounded font-extrabold cursor-pointer"
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
