import { useCreateMyRestaurant } from "../api/MyRestaurantApi";
import Managerestaurantform from "../forms/manage-restaurant-form/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { isLoading, createMyRestaurant } = useCreateMyRestaurant();
  return (
    <Managerestaurantform isLoading={isLoading} onSave={createMyRestaurant} />
  );
}

export default ManageRestaurantPage;
