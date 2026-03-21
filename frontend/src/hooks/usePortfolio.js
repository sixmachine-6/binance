import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../services/apiPortfolio";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });
}
