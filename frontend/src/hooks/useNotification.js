import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
} from "../services/apiNotification";

export function useNotifications() {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const countQuery = useQuery({
    queryKey: ["notificationCount"],
    queryFn: fetchUnreadCount,
    initialData: 0, // prevents undefined
  });

  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
    },
  });

  return {
    notifications: notificationsQuery.data || [],
    count: countQuery.data || 0,
    isLoading: notificationsQuery.isLoading,
    markRead: markReadMutation.mutate,
  };
}
