import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "../../types";

type CheckoutSessionRequest = {
  CartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getOrdersRequest = async ():Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${BACKEND_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if(!response.ok) {
      throw new Error(response.statusText);
    }    
    return response.json();  
  }
  const { data: getOrders, isLoading } = useQuery('getOrders', getOrdersRequest);
  return{ getOrders, isLoading };

}



export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(
      `${BACKEND_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }
    return response.json();
  };

  const {
    mutateAsync: createSessionCheckout,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    createSessionCheckout,
    isLoading,
  };
};
