import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWatchlist,
  addWatchlist,
  removeWatchlist,
} from "../services/apiWatchlist";

export function useWatchlist() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });

  const addMutation = useMutation({
    mutationFn: addWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist"]);
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist"]);
    },
  });

  const watchlist = data?.watchlist ?? [];

  const toggleWatchlist = (symbol) => {
    if (watchlist.includes(symbol)) {
      removeMutation.mutate(symbol);
    } else {
      addMutation.mutate(symbol);
    }
  };

  return {
    watchlist,
    toggleWatchlist,
  };
}
