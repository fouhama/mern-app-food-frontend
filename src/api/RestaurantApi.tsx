import { useQuery } from "react-query";
import { toast } from "sonner";
import { SearchRestaurantRequest } from "../../types";
import { SearchState } from "../pages/SearchPage";

const BASE_URL_BACK = import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantRequest =
    async (): Promise<SearchRestaurantRequest> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);

      const response = await fetch(
        `${BASE_URL_BACK}/api/restaurant/search/${city}?${params.toString()}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(" Failed to fetch Restaruants");
      }
      return response.json();
    };

  const {
    data: results,
    isLoading,
    error,
  } = useQuery(["searchRestaurants", searchState], searchRestaurantRequest, {
    enabled: !!city,
  });
  if (error) {
    toast.error("Not found");
  }
  return { results, isLoading };
};
