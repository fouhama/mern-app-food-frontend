import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "../api/MyRestaurantApi";
import Managerestaurantform from "../forms/manage-restaurant-form/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { isLoading, createMyRestaurant } = useCreateMyRestaurant();
  const { Restaurant } = useGetMyRestaurant();
  return (
    <Managerestaurantform
      restaurant={Restaurant}
      isLoading={isLoading}
      onSave={createMyRestaurant}
    />
  );
}

export default ManageRestaurantPage;
