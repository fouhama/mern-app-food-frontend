import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";
import Managerestaurantform from "../forms/manage-restaurant-form/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { Restaurant } = useGetMyRestaurant();
  const { createMyRestaurant, isLoading: isLoadingCreate } =
    useCreateMyRestaurant();
  const { updateMyRestaurant, isLoading: isLoadingUpdate } =
    useUpdateMyRestaurant();
  const isEditing = !!Restaurant;
  return (
    <Managerestaurantform
      restaurant={Restaurant}
      isLoading={isLoadingCreate || isLoadingUpdate}
      onSave={isEditing ? updateMyRestaurant : createMyRestaurant}
    />
  );
}

export default ManageRestaurantPage;
