import { useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant, SearchRestaurantRequest } from "../../types";
import { SearchState } from "../pages/SearchPage";

const BASE_URL_BACK = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restrauntid?: string) => {
  const getRestaurantById = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${BASE_URL_BACK}/api/restaurant/${restrauntid}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching restaurant");
    }

    return response.json();
  };

  const {
    data: Restaurant,
    isLoading,
    error,
  } = useQuery("getRestaurant", getRestaurantById, {
    enabled: !!restrauntid,
  });
  if (error) {
    toast.error(" Error fetching restaurant");
  }
  return {
    Restaurant,
    isLoading,
  };
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantRequest =
    async (): Promise<SearchRestaurantRequest> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOption", searchState.sortOption);

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
