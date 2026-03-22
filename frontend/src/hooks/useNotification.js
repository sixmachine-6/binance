import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../services/apiNotification";

export function useNotifications() {
  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  return {
    notifications: notificationsQuery.data || [],
    isLoading: notificationsQuery.isLoading,
  };
}
