import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "../../types";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };
  const {
    mutate: createMyRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);
  if (isSuccess) {
    toast.success(" Restaurant created successfully");
  }
  if (error) {
    toast.error("Error creating restaurant");
  }
  return {
    isLoading,
    createMyRestaurant,
  };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${VITE_API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(" Error fetching restaurant");
    }
    return response.json();
  };
  const { data: Restaurant, isLoading } = useQuery(
    "fetchMyRestaurnt",
    getMyRestaurantRequest
  );

  return { Restaurant, isLoading };
};
